require("dotenv").config();
const express = require("express");
const path = require("path");
const AuthService = require("../auth/auth-service");
const DogsService = require("../dogs/dogs-service");
const AdoptionService = require("./adoption-service");
const { requireAuth } = require("../middleware/jwt-auth");
const adoptionRouter = express.Router();
const jsonBodyParser = express.json();

adoptionRouter
	.route("/")
	.all(requireAuth)
	.get((req, res, next) => {
		res.status(200).send("hello");
	})
	.post(jsonBodyParser, (req, res, next) => {
		const {
			adoption_date,
			adopter_name,
			adopter_email,
			adopter_phone,
			adopter_country,
			adopter_address,
			dog_id,
		} = req.body;

		DogsService.getDogByDogId(req.app.get("db"), req.body.dog_id)
			.then((dog) => {
				if (!dog || dog === undefined) {
					res.status(404).json({ error: `Can't find dog.` });
				} else {
					const updateDogObj = {
						dog_name: dog.dog_name,
						dog_status: "Adopted",
					};
					return DogsService.updateDogById(
						req.app.get("db"),
						dog.id,
						updateDogObj
					);
				}
			})
			.then((res) => {
				// console.log(res);
				const adoptionObj = {
					adoption_date,
					adopter_name,
					adopter_email,
					adopter_phone,
					adopter_country,
					adopter_address,
					dog_id,
				};

				return AdoptionService.insertAdoption(req.app.get("db"), adoptionObj);
			})
			.then((adoptionRecord) => {
				// console.log(adoptionRecord);
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${adoptionRecord.id}`))
					.json(adoptionRecord);
			})
			.catch(next);
	});

adoptionRouter
	.route("/:dogId")
	.all(requireAuth)
	.get((req, res, next) => {
		AdoptionService.getAdoptionBydogId(req.app.get("db"), req.params.dogId)
			.then((response) => {
				if (!response) {
					res.status(400).json({ error: `Can't find adoption information.` });
				}
				res.status(200).json(response);
			})
			.catch(next);
	})
	.delete((req, res, next) => {
		DogsService.getDogByDogId(req.app.get("db"), req.params.dogId)
			.then((dog) => {
				if (!dog || dog.length === 0) {
					return res.status(404).json({ error: `Can't find dog.` });
				} else {
					const updateDogObj = {
						dog_name: dog.dog_name,
						dog_status: "Current",
					};
					return DogsService.updateDogById(
						req.app.get("db"),
						dog.id,
						updateDogObj
					);
				}
			})
			.then((res) => {
				return AdoptionService.deleteAdoption(
					req.app.get("db"),
					req.params.dogId
				);
			})
			.then((response) => {
				res.status(204).end();
			})
			.catch(next);
	});

module.exports = adoptionRouter;
