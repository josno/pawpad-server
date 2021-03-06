const FosterService = {
	insertFoster(db, data) {
		return db
			.insert(data)
			.into("foster")
			.returning("*")
			.then((array) => {
				return array[0];
			});
	},
	deleteFoster(db, id) {
		return db.from("foster").where("dog_id", id).delete();
	},
	getFosterBydogId(db, id) {
		return db.from("foster").select("*").where("dog_id", id);
	},
	updateFoster(db, fosterId, foster) {
		return db
			.from("foster")
			.where("id", fosterId)
			.update(foster)
			.then((foster) => {
				return foster;
			});
	},
	updateFosterImg(db, id, url) {
		return db
			.from("foster")
			.where("dog_id", id)
			.update(url, ["dog_id", "contract_url"]);
	},
};

module.exports = FosterService;
