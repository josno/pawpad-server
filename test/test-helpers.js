const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
	const token = jwt.sign({ user_id: user.id }, secret, {
		subject: user.user_name,
		algorithm: "HS256",
	});

	return `Bearer ${token}`;
}

const makeDogsArray = () => {
	return [
		{
			id: 1,
			dog_name: "Winky",
			profile_img:
				"https://raw.githubusercontent.com/josno/pawpad-client/master/src/dog-images/Winky.jpg",
			age: "2 months",
			date_created: "2020-01-31T18:16:54.653Z",
			arrival_date: "2019-10-19T10:23:00.000Z",
			gender: "Male",
			spayedneutered: true,
			updated_by: "Melanie",
			dog_status: "Current",
			adoption_date: null,
			archive_date: null,
		},
		{
			id: 2,
			dog_name: "Coska",
			profile_img:
				"https://raw.githubusercontent.com/josno/pawpad-client/master/src/dog-images/Coska.jpg",
			age: "unknown",
			date_created: "2020-01-31T18:16:54.653Z",
			arrival_date: "2019-07-28T08:00:00.000Z",
			gender: "Female",
			spayedneutered: false,
			updated_by: "Sarah",
			dog_status: "Current",
			adoption_date: null,
			archive_date: null,
		},
	];
};

const makeNotesArray = () => {
	return [
		{
			dog_id: 1,
			notes: "Winky needs to get his serum shots",
			type_of_note: "medical",
			note_updated_by: "Melanie",
			created_by: 1,
			date_created: "2020-01-31T05:52:34.948Z",
		},
		{
			dog_id: 2,
			notes: "Coska is being considered for adoption",
			type_of_note: "additional",
			note_updated_by: "Sarah",
			created_by: 2,
			date_created: "2020-01-31T05:52:34.948Z",
		},
	];
};

makeNewNote = () => {
	return {
		date_created: "2020-02-13T16:05:56.766Z",
		notes: "Test",
		type_of_note: "medical",
		user_name: "demo",
		dog_id: "2",
	};
};

const makeShotToInsert = () => {
	return {
		shot_name: "Rabies",
		shot_iscompleted: true,
		dog_id: 1,
	};
};

const makeExpectedNotes = () => {
	return [
		{
			id: 1,
			dog_id: 1,
			notes: "Winky needs to get his serum shots",
			type_of_note: "medical",
			note_updated_by: "Melanie",
			created_by: 1,
			date_created: "2020-01-31T05:52:34.948Z",
		},
		{
			id: 2,
			dog_id: 1,
			notes: "Winky is a puppy, separate from older dogs",
			type_of_note: "additional",
			note_updated_by: "Melanie",
			created_by: 1,
			date_created: "2020-01-31T05:52:34.948Z",
		},
		{
			id: 3,
			dog_id: 2,
			notes: "Coska is being considered for adoption",
			type_of_note: "additional",
			note_updated_by: "Sarah",
			created_by: 2,
			date_created: "2020-01-31T05:52:34.948Z",
		},
	];
};

const makeShotToUpdate = () => {
	return {
		shot_name: "Rabies",
		shot_iscompleted: false, //change from true
		dog_id: 1,
		shot_date: "2020-01-19 14:23:00",
	};
};

const makeBadShotToUpdate = () => {
	return {
		shot_name: "Rabies",
		shot_iscompleted: false, //change from true
		dog_id: 9845,
	};
};

const makeExpectedShots = () => {
	return [
		{
			shot_name: "Rabies",
			shot_iscompleted: true,
			dog_id: 1,
			id: 1,
			shot_date: "2020-03-17T22:08:38.723Z",
		},
		{
			shot_name: "Complex I",
			shot_iscompleted: true,
			dog_id: 1,
			id: 2,
			shot_date: "2020-03-17T22:08:38.723Z",
		},
		{
			shot_name: "Complex II",
			shot_iscompleted: true,
			dog_id: 1,
			id: 3,
			shot_date: "2020-03-17T22:08:38.723Z",
		},
		{
			shot_name: "Serum",
			shot_iscompleted: true,
			dog_id: 1,
			id: 4,
			shot_date: "2020-03-17T22:08:38.723Z",
		},
	];
};

const makeShotsArray = () => {
	return [
		{
			shot_date: "2020-03-17T22:08:38.723122",
			shot_name: "Rabies",
			shot_iscompleted: true,
			dog_id: 1,
		},
		{
			shot_date: "2020-03-17T22:08:38.723122",
			shot_name: "Complex I",
			shot_iscompleted: true,
			dog_id: 1,
		},
		{
			shot_date: "2020-03-17T22:08:38.723122",
			shot_name: "Complex II",
			shot_iscompleted: true,
			dog_id: 1,
		},
		{
			shot_date: "2020-03-17T22:08:38.723122",
			shot_name: "Serum",
			shot_iscompleted: true,
			dog_id: 1,
		},

		{
			shot_date: "2020-03-17T22:08:38.723122",
			shot_name: "Rabies",
			shot_iscompleted: true,
			dog_id: 2,
		},
		{
			shot_date: "2020-03-17T22:08:38.723122",
			shot_name: "Complex I",
			shot_iscompleted: true,
			dog_id: 2,
		},
		{
			shot_date: "2020-03-17T22:08:38.723122",
			shot_name: "Complex II",
			shot_iscompleted: false,
			dog_id: 2,
		},
		{
			shot_date: "2020-03-17T22:08:38.723122",
			shot_name: "Fungus",
			shot_iscompleted: true,
			dog_id: 2,
		},
	];
};

const makeExpectedNormalizedData = () => {
	return [
		{
			id: 1,
			dog_name: "Winky",
			profile_img:
				"https://raw.githubusercontent.com/josno/pawpad-client/master/src/dog-images/Winky.jpg",
			age: "2 months",
			arrival_date: "2019-10-19T10:23:00.000Z",
			gender: "Male",
			spayedneutered: true,
			updated_by: "Melanie",
			microchip: null,
			tag_number: null,
			shotsCompleted: [
				{
					shot_date: "2020-03-17T22:08:38.723122",
					shot_name: "Rabies",
					shot_iscompleted: true,
				},
				{
					shot_date: "2020-03-17T22:08:38.723122",
					shot_name: "Complex I",
					shot_iscompleted: true,
				},
				{
					shot_date: "2020-03-17T22:08:38.723122",
					shot_name: "Complex II",
					shot_iscompleted: true,
				},
				{
					shot_date: "2020-03-17T22:08:38.723122",
					shot_name: "Serum",
					shot_iscompleted: true,
				},
			],
		},
	];
};

function makeUsersArray() {
	return [
		{
			id: 1,
			user_name: "pawpad",
			first_name: "Pawpad",
			last_name: "User",
			password: "pawpad123",
			date_created: "2020-01-22T18:16:54.653Z",
		},
		{
			id: 2,
			user_name: "demo",
			first_name: "Demo",
			last_name: "User",
			password: "password",
			date_created: "2020-01-22T18:16:54.653Z",
		},
	];
}

function seedUsers(db, users) {
	const preppedUsers = users.map((user) => ({
		...user,
		password: bcrypt.hashSync(user.password, 1),
	}));
	return db
		.into("users")
		.insert(preppedUsers)
		.then(() => {
			db.raw(`SELECT setval('users_id_seq', ?)`, [users[users.length - 1].id]);
		});
}

const makeDogToUpdate = () => {
	return {
		id: 1,
		dog_name: "Winky",
		profile_img:
			"https://raw.githubusercontent.com/josno/pawpad-client/master/src/dog-images/Winky.jpg",
		age: "2 months",
		arrival_date: "2019-10-19T10:23:00.000Z",
		gender: "Male",
		spayedneutered: true, //user_name to change to first_name
	};
};

const makeNewDog = () => {
	return {
		dog_name: "Max",
		age: "8 years",
		arrival_date: "2018-07-19T10:23:00.000Z",
		gender: "Male",
		spayedneutered: true,
	};
};

const seedDogsTable = (db, dogs) => {
	return db
		.into("dogs")
		.insert(dogs)
		.then(() =>
			// update the auto sequence to stay in sync
			db.raw(`SELECT setval('dogs_id_seq', ?)`, [dogs[dogs.length - 1].id])
		);
};

function seedAllTables(db, dogs, notes, shots, users) {
	// use a transaction to group the queries and auto rollback on any failure
	return db.transaction(async (trx) => {
		await seedUsers(trx, users);
		await seedDogsTable(trx, dogs);

		trx.into("notes").insert(notes);

		if (shots.length) {
			trx.into("shots").insert(shots);
		}
	});
}

const clearTables = (db) => {
	return db.transaction((trx) =>
		trx
			.raw(
				`TRUNCATE
        notes,
		shots,
		users,
        dogs
      `
			)
			.then(() =>
				Promise.all([
					trx.raw(`ALTER SEQUENCE dogs_id_seq minvalue 0 START WITH 1`),
					trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
					trx.raw(`ALTER SEQUENCE notes_id_seq minvalue 0 START WITH 1`),
					trx.raw(`ALTER SEQUENCE shots_id_seq minvalue 0 START WITH 1`),
					trx.raw(`SELECT setval('notes_id_seq', 0)`),
					trx.raw(`SELECT setval('shots_id_seq', 0)`),
					trx.raw(`SELECT setval('users_id_seq', 0)`),
					trx.raw(`SELECT setval('dogs_id_seq', 0)`),
				])
			)
	);
};

module.exports = {
	makeDogsArray,
	makeNotesArray,
	makeShotsArray,
	makeExpectedNormalizedData,
	clearTables,
	makeNewDog,
	makeDogToUpdate,
	seedAllTables,
	makeShotToInsert,
	makeShotToUpdate,
	makeBadShotToUpdate,
	makeUsersArray,
	seedUsers,
	makeAuthHeader,
	makeExpectedShots,
	makeExpectedNotes,
	makeNewNote,
};
