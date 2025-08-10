import Database from 'better-sqlite3'
import path from 'path'

let db = null

export function getDb() {
    if (!db) {
        const dbPath = path.join(process.cwd(), "scandata.db")
        db = new Database(dbPath)
        db.pragma("journal_mode = WAL")
        db.exec(`
            CREATE TABLE IF NOT EXISTS "scandata" (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                item TEXT NOT NULL,
                points INTEGER,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `)
        console.log("Database Initialized !")
    }
    return db
}

export function clearDb() {
    const db = getDb()
    db.prepare('DELETE FROM "scandata"').run()
    db.prepare("DELETE FROM sqlite_sequence WHERE name = 'scandata'").run()
}

export const scandataDB = {
    insertData(item, points) {
        const db = getDb()
        const stmt = db.prepare('INSERT INTO "scandata" (item, points) VALUES(?, ?)')
        return stmt.run(item, points)
    },

    getAllData() {
        const db = getDb()
        return db.prepare(`SELECT * FROM "scandata" ORDER BY id`).all()
    }
}