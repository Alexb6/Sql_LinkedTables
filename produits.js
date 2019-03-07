const fs = require('fs'); // file system
const sqlite3 = require('sqlite3').verbose();
// const express = require('express');
// const cors = require('cors');

const dbFile = 'tableau.db';
const db = new sqlite3.Database(dbFile); // binary file

/* const app = express();
app.use(cors()); // to lift the http barrers to connect outside http */


db.serialize(() => {
    // Category Table
    db.run('CREATE TABLE IF NOT EXISTS category (category_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, category_type TEXT, category_sales BOOLEAN)');

    db.run('INSERT INTO category (category_type, category_sales) VALUES (?, ?)', 'tShirt', false);
    db.run('INSERT INTO category (category_type, category_sales) VALUES (?, ?)', 'robe', false);
    db.run('INSERT INTO category (category_type, category_sales) VALUES (?, ?)', 'pantalon', false);
    db.run('INSERT INTO category (category_type, category_sales) VALUES (?, ?)', 'ceinture', false);
    db.run('INSERT INTO category (category_type, category_sales) VALUES (?, ?)', 'bretelle', false);
    db.all('SELECT * FROM category', function (error, data) {
        if (!error) console.log(data);
        else console.log(error);
    });

    // Brands Table
    db.run('CREATE TABLE IF NOT EXISTS brands (brands_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, brands_name TEXT, brands_fournisseur TEXT)');

    db.run('INSERT INTO brands (brands_name, brands_fournisseur) VALUES (?, ?)', 'Levis', 'A');
    db.run('INSERT INTO brands (brands_name, brands_fournisseur) VALUES (?, ?)', 'D&G', 'G');
    db.run('INSERT INTO brands (brands_name, brands_fournisseur) VALUES (?, ?)', 'A_Mc_Queen', 'J');
    db.all('SELECT * FROM brands', function (error, data) {
        if (!error) console.log(data);
        else console.log(error);
    });

    /* Pour créer une foreign key
    1 - Créer une colonne pour la réceptionner -> student_id INTEGER,
    2 - Définir cette colonne comme Foreign Key -> FOREIGN KEY(student_id)
    3 -  Indiquer à quelle table et quelle colonne fait référence à cette Foreign Key -> REFERENCES students(id)
    */

    // Produits Table
    db.run('CREATE TABLE IF NOT EXISTS produits (produits_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, produits_name TEXT NON NULL, produits_prix INTEGER NON NULL, category_id INTEGER, brands_id INTEGER, FOREIGN KEY (category_id) REFERENCES category (category_id), FOREIGN KEY (brands_id) REFERENCES brands (brands_id))');

    db.run('INSERT INTO produits (produits_name, produits_prix, category_id, brands_id) VALUES (?, ?, ?, ?)', 'tShirtMomo', 55, 1, 1);
    db.run('INSERT INTO produits (produits_name, produits_prix, category_id, brands_id) VALUES (?, ?, ?, ?)', 'tShirtBaba', 35, 1, 3);
    db.run('INSERT INTO produits (produits_name, produits_prix, category_id, brands_id) VALUES (?, ?, ?, ?)', 'robeTuba', 45, 2, 2);
    db.run('INSERT INTO produits (produits_name, produits_prix, category_id, brands_id) VALUES (?, ?, ?, ?)', 'pantalonBuba', 34, 3, 1);
    db.run('INSERT INTO produits (produits_name, produits_prix, category_id, brands_id) VALUES (?, ?, ?, ?)', 'robeGaba', 92, 2, 3);
    db.run('INSERT INTO produits (produits_name, produits_prix, category_id, brands_id) VALUES (?, ?, ?, ?)', 'pantalonBibi', 44, 3, 3);
    db.all('SELECT * FROM produits', function (error, data) {
        if (!error) console.log(data);
        else console.log(error);
    });
    // Shops Table
    db.run('CREATE TABLE IF NOT EXISTS shops (shops_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, shops_name TEXT, shops_adresse TEXT, shops_tel TEXT)');

    db.run('INSERT INTO shops (shops_name, shops_adresse, shops_tel) VALUES (?, ?, ?)', 'Anteide', '256 avenue Laval, Paris', '01 45 67 42 88');
    db.run('INSERT INTO shops (shops_name, shops_adresse, shops_tel) VALUES (?, ?, ?)', 'Passeda', '28 rue Carnot, Rennes', '02 70 47 99 68');
    db.run('INSERT INTO shops (shops_name, shops_adresse, shops_tel) VALUES (?, ?, ?)', 'Calzono', '29 boulevard Sandt, Strasbourg', '03 88 68 44 23');
    db.all('SELECT * FROM shops', function (error, data) {
        if (!error) console.log(data);
        else console.log(error);
    });

    // Joining table
    db.run('CREATE TABLE IF NOT EXISTS produits_to_shops (produits_to_shops_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, produits_to_shops_quantity INTEGER, produits_id INTEGER, shops_id INTEGER, FOREIGN KEY (produits_id) REFERENCES produits (produits_id), FOREIGN KEY (shops_id) REFERENCES shops (shops_id))');

    db.run('INSERT INTO produits_to_shops (produits_to_shops_quantity, produits_id, shops_id) VALUES (?, ?, ?)', 3, 1, 3);
    db.run('INSERT INTO produits_to_shops (produits_to_shops_quantity, produits_id, shops_id) VALUES (?, ?, ?)', 1, 1, 2);
    db.run('INSERT INTO produits_to_shops (produits_to_shops_quantity, produits_id, shops_id) VALUES (?, ?, ?)', 2, 5, 1);
    db.run('INSERT INTO produits_to_shops (produits_to_shops_quantity, produits_id, shops_id) VALUES (?, ?, ?)', 1, 4, 3);

    db.all('SELECT * FROM produits NATURAL JOIN produits_to_shops NATURAL JOIN shops NATURAL JOIN brands', function (error, data) {
        if (!error) console.log(data);
        else console.log(error);
    });
});


