const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('kickplayer')
		.setDescription('Kick player from Bangsaen')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	async execute(interaction) {
		const modal = new ModalBuilder()
        .setTitle("เตะผู้เล่น")
        .setCustomId(`kickModal - ${interaction.user.id}`);

        const playerIdInput = new TextInputBuilder()
        .setCustomId('playerId')
        .setRequired(true)
        .setLabel('Id ของผู้เล่นที่จะเตะ')
        .setStyle(TextInputStyle.Short)

        const reasonInput = new TextInputBuilder()
        .setCustomId('reasonId')
        .setRequired(true)
        .setLabel('เหตุผลที่เตะ')
        .setStyle(TextInputStyle.Paragraph)

        const playerIdActionRow = new ActionRowBuilder().addComponents(playerIdInput);
        const reasonActionRow = new ActionRowBuilder().addComponents(reasonInput);

        modal.addComponents(playerIdActionRow, reasonActionRow);

        await interaction.showModal(modal)
	},
};