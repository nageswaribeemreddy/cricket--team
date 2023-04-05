const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
const.use(express.JSON());
const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();
const convertDbObjectToResponseObject = (dbObject) => {
  return {
    playerId: dbObject.player_id,
    playerName: dbObject.player_name,
    jerseyNumber: dbObject.jersey_number,
    role: dbObject.role,
  };
};
app.get("/players/", async (request, response) => {
  const getPlayersQuery = `
 SELECT
 *
 FROM
 cricket_team;`;
  const playersArray = await database.all(getPlayersQuery);
  response.send(
    playersArray.map((eachPlayer) =>
      convertDbObjectToResponseObject(eachPlayer)
    )
  );
});

app.post("/players/", async (request, response) => {
  const addPlayersQuery = `
    INSERT INTO 
    cricket_team (player_name, jersey_number, role)
    VALUES
    (
        ${player_name},
        ${jersey_number},
        ${role})`;
  const dbResponse = await db.run(addPlayersQuery);
  const player_id = dbResponse.lastID;
  response.send({ player_id: player_id });
});
 const updatePlayerQuery = UPDATE
    cricket_team
  SET
    player_name = '${playerName}',
    jersey_number = ${jerseyNumber},
    role = '${role}'
  WHERE
    player_id = ${playerId};;
await db.run(updatePlayerQuery);
response.send("Player Details Updates");
app.delete("players/:playerId/", async (request, response) => {
    const{player_id} = request.params;
    const DeletePlayerQuery = `
    DELETE FROM cricket_team
    WHERE player_id = ${playerId};`;
await db.run (DeletePlayerQuery);
response.send("Player Removed");
})
module.exports=app;