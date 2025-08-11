import Database from 'better-sqlite3'
import path from 'path'

let db = null

export function getDb() {
    if (!db) {
        const dbPath = path.join(process.cwd(), "history.db")
        db = new Database(dbPath)
        db.pragma("journal_mode = WAL")
        db.exec(`
            CREATE TABLE IF NOT EXISTS "history" (
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
    db.prepare('DELETE FROM "history"').run()
    db.prepare("DELETE FROM sqlite_sequence WHERE name = 'history'").run()
}

export const historyDb = {

    getAllData() {
        const db = getDb()
        return db.prepare(`SELECT * FROM "history" ORDER BY id`).all()
    },

    getTotalPoints() {
        const db = getDb()
        const getValue = db.prepare(`SELECT SUM(points) AS totalPoints FROM history`).get()
        return getValue.totalPoints ?? 0
    },

    insertData(item, points) {
        const db = getDb()
        const stmt = db.prepare('INSERT INTO "history" (item, points) VALUES(?, ?)')
        return stmt.run(item, points)
    }


}