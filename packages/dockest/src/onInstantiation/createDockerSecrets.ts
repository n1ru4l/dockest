import fs from 'fs'
import os from 'os'
import path from 'path'
import { DockerSecret } from '../@types'

const createTemporaryDirectory = () =>
  new Promise<string>((resolve, reject) => {
    fs.mkdtemp(path.join(os.tmpdir(), 'tmp-dockest-'), (err, folderPath) => {
      if (err) return reject(err)
      resolve(folderPath)
    })
  })

const removeDirectory = (folderPath: string) =>
  new Promise((resolve, reject) => {
    fs.rmdir(folderPath, err => {
      if (err) return reject(err)
      resolve()
    })
  })

const deleteFile = (filePath: string) =>
  new Promise<string>((resolve, reject) => {
    fs.unlink(filePath, err => {
      if (err) return reject(err)
      resolve()
    })
  })

const createDockerSecret = (secretFolder: string, secret: DockerSecret) =>
  new Promise<string>((resolve, reject) => {
    const filePath = path.join(secretFolder, secret.name)
    fs.writeFile(filePath, secret.content, 'utf-8', err => {
      if (err) return reject(err)
      resolve(filePath)
    })
  })

export default async (secrets: Array<DockerSecret>) => {
  const folder = await createTemporaryDirectory()
  const secretToFolderMappings: { [key: string]: string | undefined } = {}
  for (const secret of secrets) {
    const path = await createDockerSecret(folder, secret)
    secretToFolderMappings[secret.name] = path
  }

  const getSecretPath = (secretName: string) => {
    const path = secretToFolderMappings[secretName]
    if (!path) throw new Error(`Secret with the name '${secretName}' was not registered.`)
    return path
  }

  const cleanup = async () => {
    for (const secretPath of Object.values(secretToFolderMappings)) {
      if (!secretPath) continue
      await deleteFile(secretPath)
    }
    await removeDirectory(folder)
  }

  return {
    getSecretPath,
    cleanup,
  }
}
