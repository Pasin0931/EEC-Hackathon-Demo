import Database from 'better-sqlite3'
import path from 'path'

let db = null

export function getDb() {
    if (!db) {
        const dbPath = path.join(process.cwd(), "promotions.db")
        db = new Database(dbPath)
        db.pragma("journal_mode = WAL")
        db.exec(`
            CREATE TABLE IF NOT EXISTS "promotions" (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                promotion TEXT NOT NULL,
                cost INTEGER,
                picture TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `)
        console.log("Promotions Database Initialized !")
    }
    return db
}

export function clearDb() {
    const db = getDb()
    db.prepare('DELETE FROM "promotions"').run()
    db.prepare("DELETE FROM sqlite_sequence WHERE name = 'promotions'").run()
}

export function removeById(id) {
    const db = getDb()
    const stmt = db.prepare('DELETE FROM "promotions" WHERE id=?')
    return stmt.run(id)
}

export function getAllData() {
    const db = getDb()
    return db.prepare(`SELECT * FROM "promotions" ORDER BY id`).all()
}

export function insertData(promotion, cost, picture) {
    const db = getDb()
    const stmt = db.prepare('INSERT INTO "promotions" (promotion, cost, picture) VALUES(?, ?, ?)')
    return stmt.run(promotion, cost, picture)
}
