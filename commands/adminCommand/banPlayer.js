const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('banplayer')
		.setDescription('Ban player from Bangsaen')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const modal = new ModalBuilder()
        .setTitle("เตือนผู้เล่น")
        .setCustomId(`banModal - ${interaction.user.id}`);

        const playerIdInput = new TextInputBuilder()
        .setCustomId('playerId')
        .setRequired(true)
        .setLabel('Username ของผู้เล่นที่จะแบน')
        .setStyle(TextInputStyle.Short)

        const reasonInput = new TextInputBuilder()
        .setCustomId('reasonId')
        .setRequired(true)
        .setLabel('เหตุผลที่แบน')
        .setStyle(TextInputStyle.Paragraph)

        const durationInput = new TextInputBuilder()
        .setCustomId('durationId')
        .setRequired(true)
        .setLabel('ระยะเวลา (กำหนดเป็นวัน)')
        .setStyle(TextInputStyle.Short)

        const playerIdActionRow = new ActionRowBuilder().addComponents(playerIdInput);
        const reasonActionRow = new ActionRowBuilder().addComponents(reasonInput);
        const durationActionRow = new ActionRowBuilder().addComponents(durationInput);

        modal.addComponents(playerIdActionRow, reasonActionRow, durationActionRow);

        await interaction.showModal(modal)
	},
};