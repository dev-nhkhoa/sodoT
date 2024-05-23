import { Client, Databases, Account } from 'react-native-appwrite'

const appwrite = {
  projectId: '664f368f000ef1fed685',
  databaseId: '664f37330017234fd41d',
  collectionId: '664f37390021e9cc7f75',
  platform: 'me.nhkhoa.sodot'
}

export const { projectId, databaseId, collectionId, platform } = appwrite

const client = new Client()
client.setEndpoint('https://cloud.appwrite.io/v1').setProject(projectId).setPlatform(platform)

export const account = new Account(client)
export const databases = new Databases(client)
