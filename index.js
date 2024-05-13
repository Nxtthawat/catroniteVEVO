const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder, WebhookClient, ActivityType } = require('discord.js');
require('dotenv').config();
const api = require('./api/playerManagement.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	client.user.setActivity({
		name: 'Meow MEOW meow MEOWWWWWW',
		type: ActivityType.Playing
	})
});

client.login(process.env.DISCORD_TOKEN);

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

//Normal Command Handler
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	//console.log(interaction);

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}

});

//Modal Event Handler
client.on(Events.InteractionCreate, async interaction =>{
	if(!interaction.isModalSubmit()) return;

	//console.log(interaction)

	if(interaction.customId === `kickModal - ${interaction.user.id}`){
		await interaction.reply({content: "You have summitted kick request!", ephemeral: true});
		const whClient = new WebhookClient({id: process.env.KICK_LOGS_WEBHOOK_ID, token: process.env.KICK_LOGS_WEBHOOK_TOKEN})
		//console.log(interaction)

		try{
			const UserId = interaction.fields.getTextInputValue('playerId');
			const Reason = interaction.fields.getTextInputValue('reasonId');

			const embed = new EmbedBuilder()
			.setTitle('Kicked from discord command')
			.setColor('Yellow')
			.addFields(
				{name: "UserId", value: UserId},
				{name: 'Reason', value: Reason},
				{name: 'By', value: interaction.user.displayName},
			)
			.setTimestamp();

			whClient.send({
				content: '',
				embeds: [embed],
			});

			api.kick({UserId, Reason});
		}catch (err){
			console.error(err)
		}
	}

	if(interaction.customId === `warnModal - ${interaction.user.id}`){
		await interaction.reply({content: "You have summitted warn request!", ephemeral: true});
		const whClient = new WebhookClient({id: process.env.WARN_LOGS_WEBHOOK_ID, token: process.env.WARN_LOGS_WEBHOOK_TOKEN})
		//console.log(interaction)

		try{
			const UserId = interaction.fields.getTextInputValue('playerId');
			const Reason = interaction.fields.getTextInputValue('reasonId');

			const embed = new EmbedBuilder()
			.setTitle('Warned from discord command')
			.setColor('Yellow')
			.addFields(
				{name: "UserId", value: UserId},
				{name: 'Reason', value: Reason},
				{name: 'By', value: interaction.user.displayName},
			)
			.setTimestamp();

			whClient.send({
				content: '',
				embeds: [embed],
			});

			api.warn({UserId, Reason});
		}catch (err){
			console.error(err)
		}
	}

	if(interaction.customId === `banModal - ${interaction.user.id}`){
		await interaction.reply({content: "You have summitted ban request!", ephemeral: true});
		const whClient = new WebhookClient({id: process.env.BAN_LOGS_WEBHOOK_ID, token: process.env.BAN_LOGS_WEBHOOK_TOKEN})
		//console.log(interaction)

		try{
			const UserId = interaction.fields.getTextInputValue('playerId');
			const Reason = interaction.fields.getTextInputValue('reasonId');
			const dayDuration = interaction.fields.getTextInputValue('durationId');

			const Duration = dayDuration * 86400

			const embed = new EmbedBuilder()
			.setTitle('Banned from discord command')
			.setColor('Red')
			.addFields(
				{name: "UserId", value: UserId},
				{name: 'Reason', value: Reason},
				{name: 'By', value: interaction.user.displayName},
				{name: 'Duration', value: dayDuration + " day(s)"},
			)
			.setTimestamp();

			whClient.send({
				content: '',
				embeds: [embed],
			});

			api.ban({UserId, Reason, Duration});
		}catch (err){
			console.error(err)
		}
	}

	if(interaction.customId === `clearWarnModal - ${interaction.user.id}`){
		await interaction.reply({content: "You have summitted warn clear request!", ephemeral: true});
		const whClient = new WebhookClient({id: process.env.WARN_LOGS_WEBHOOK_ID, token: process.env.WARN_LOGS_WEBHOOK_TOKEN})

		try{
			const UserId = interaction.fields.getTextInputValue('playerId');

			const embed = new EmbedBuilder()
			.setTitle('Warn clear from discord command')
			.setColor('Blue')
			.addFields(
				{name: "UserId", value: UserId},
				{name: 'By', value: interaction.user.displayName},
			)
			.setTimestamp();

			whClient.send({
				content: '',
				embeds: [embed],
			});

			api.clearWarn({UserId});
		}catch (err){
			console.error(err)
		}
	}

	if(interaction.customId === `unbanModal - ${interaction.user.id}`){
		await interaction.reply({content: "You have summitted unban request!", ephemeral: true});
		const whClient = new WebhookClient({id: process.env.BAN_LOGS_WEBHOOK_ID, token: process.env.BAN_LOGS_WEBHOOK_TOKEN})

		try{
			const UserId = interaction.fields.getTextInputValue('playerId');

			const embed = new EmbedBuilder()
			.setTitle('Ban clear from discord command')
			.setColor('Blue')
			.addFields(
				{name: "UserId", value: UserId},
				{name: 'By', value: interaction.user.displayName},
			)
			.setTimestamp();

			whClient.send({
				content: '',
				embeds: [embed],
			});

			api.unban({UserId});
		}catch (err){
			console.error(err)
		}
	}
})