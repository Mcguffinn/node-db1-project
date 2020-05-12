const express = require('express');
const router = express.Router();
const db = require("../data/dbConfig.js");

router.use(express.json());

router.get("/", (req, res) => {
    db.select("*")
        .from("accounts")
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err =>{
            res.status(500).json({message: "Failed to get accounts, ", error: err.message})
        })
})

router.get("/:id", (req, res) => {
    getById(req.params.id)
      .then(account => {
        res.status(200).json(account);
      })
      .catch(err => {
        console.log(err);
  
        res.status(500).json({ error: "Account not found, ", error: err.message });
      });
  });

router.post("/", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then(ids => {
      return getById(ids)
        .then(added => {
          res.status(201).json(added);
        })
        .catch(err => {
          res.status(500).json({ error: "failed to retrieve... ", error: err.message });
        });
    })
    .catch(err => {
      console.log(error);

      res.status(500).json({ error: "failed to retrieve... ", error: err.message });
    });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db("accounts")
      .where({id})
      .update(changes)
      .then(proc => {
        res.status(200).json(proc);
      })
      .catch(error => {
        console.log(error);
  
        res.status(500).json({ error: "failed to update the account" });
    });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db("accounts")
      .where({id})
      .del()
      .then(proc => {
        console.log("Deleted account");
        res.status(200).json(proc);
      })
      .catch(error => {
        console.log(error);
  
        res.status(500).json({ error: "Delete Spell Missed!!!" });
      });
});

function getById(id) {
    return db("accounts")
      .where({ id })
      .first();
}

module.exports = router;