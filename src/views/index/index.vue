<template>
	<div>
		<div style="margin-bottom: 20px">
			<el-button @click="findAllData">查询</el-button>
			<el-button type="primary" @click="addCandidate">添加内容</el-button>

			<el-button @click="navigateTo">跳转</el-button>
		</div>

		<el-table :data="tableData" border stripe style="width: 100%">
			<el-table-column prop="name" label="名称" width="140"> </el-table-column>
			<el-table-column prop="introduce" label="介绍"> </el-table-column>
			<el-table-column prop="createAt" label="创建时间" :formatter="formatDateTime"> </el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { initCandidateDB, getObjectStore } from '@/utils'
import dayjs from 'dayjs'

export default {
	name: 'index',
	data() {
		return {
			idbDatabase: null,
			tableData: [],
		}
	},

	async created() {
		this.idbDatabase = await initCandidateDB()

		this.getCandidateList()
	},

	methods: {
		formatDateTime({ createAt }) {
			return dayjs(createAt).format('YYYY-MM-DD HH:mm:ss')
		},
		addCandidate() {
			// this.idbDatabase
			// 	.add('custom_candidate_data', {
			// 		name: 'lisa',
			// 		introduce: 'v我50',
			// 		works: [1, 2, 3],
			// 		createAt: new Date(),
			// 	})
			// 	.then(res => {
			// 		this.$message.success('添加成功')
			// 		this.getCandidateList()
			// 	})
			// this.idbDatabase.objectStore('custom_data')

			// this.idbDatabase
			// 	.objectStore('custom_data')
			// 	.add({ name: 'lisa', introduce: 'v我50', works: [1, 2, 3], createAt: new Date() })
			// 	.then(res => {
			// 		this.$message.success('添加成功')
			// 		this.getCandidateList()
			// 	})

			// const tx = getObjectStore(this.idbDatabase, 'custom_data')

			// Promise.allSettled([
			// 	tx.store.add({ name: 'lisa', introduce: 'v我50', works: [1, 2, 3], createAt: new Date() }),
			// 	tx.store.add({ name: 'lisa', introduce: 'v我50', works: [1, 2, 3], createAt: new Date() }),
			// 	tx.done,
			// ]).then(res => {
			// 	console.log('---------------')
			// 	console.log(res)
			// })

			this.idbDatabase
				.add('custom_data', {
					name: 'lisa',
					introduce: 'v我50',
					works: [1, 2, 3],
					createAt: new Date(),
				})
				.then(res => {
					this.$message.success('添加成功')
					this.getCandidateList()
				})
		},

		findAllData() {
			// const tx = this.idbDatabase.transaction(['custom_data', 'relation_data'], 'readwrite')
			// tx.objectStore('custom_data')
			// 	.getAll()
			// 	.then(async res => {
			// 		await tx.done
			// 		console.log(res)
			// 	})
			// console.log()
		},

		findCandidateById(id) {
			this.idbDatabase.get('custom_data', id).then(res => {
				console.log(res)
			})
		},

		getCandidateList() {
			/* 			const request = indexedDB.open('CandidateList', 1)

			request.onupgradeneeded = function (event) {
				console.log('-------')
			}

			request.onerror = function (event) {
				// 错误处理
				console.log(event)
			}

			request.onsuccess = function (event) {
				const db = event.target.result

				const tx = db.transaction('custom_data', 'readonly')
				const objectStore = tx.objectStore('custom_data')

				const abc = objectStore.openCursor(null, 'prev')

				console.log(abc) // IDBRequest

				abc.onsuccess = function (event) {
					const cursor = event.target.result

					console.log(cursor)

					if (cursor) {
						// console.log(cursor.value)

						// cursor.continue()
					}
				}
			} */

			// Promise.allSettled([tx.store.getAll(), tx.done]).then(arr => {
			// 	this.tableData = arr[0].value
			// })
			// this.idbDatabase.getAll('custom_data').then(res => {
			// 	this.tableData = res.reverse()
			// })

			const tx = this.idbDatabase.transaction('custom_data', 'readwrite')

			// console.log()

			tx.store.openCursor(2, 'prev').then(async res => {
				// 

				// console.log(res.iterate)

				for await (const cursor of tx.store.iterate(null, 'prev', 2)) {
					console.log(cursor)
				}
			})
		},
		handleEdit({ id }) {
			this.findCandidateById(id)
		},
		handleDelete(candidate) {
			// const tx = this.idbDatabase.transaction('custom_data', 'readwrite')

			// console.log(tx.store.deleteIndex)

			// Promise.allSettled([tx.store.deleteIndex(candidate.id), tx.done])
			// 	.then(res => {
			// 		console.log('---------------')
			// 		console.log(res)
			// 	})
			// 	.catch(err => console.log(err))

			this.idbDatabase.delete('custom_data', candidate.id).then(res => {
				this.$message.success('删除成功')

				this.getCandidateList()
			})
		},

		navigateTo() {
			this.$router.push({ name: 'Shop' })
		},
	},
	beforeDestroy() {
		this.idbDatabase.close()
	},
}
</script>

<style lang="scss" scoped></style>
