const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('warnplayer')
		.setDescription('Warn player from Bangsaen')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const modal = new ModalBuilder()
        .setTitle("เตือนผู้เล่น")
        .setCustomId(`warnModal - ${interaction.user.id}`);

        const playerIdInput = new TextInputBuilder()
        .setCustomId('playerId')
        .setRequired(true)
        .setLabel('Username ของผู้เล่นที่จะเตือน')
        .setStyle(TextInputStyle.Short)

        const reasonInput = new TextInputBuilder()
        .setCustomId('reasonId')
        .setRequired(true)
        .setLabel('เหตุผลที่เตือน')
        .setStyle(TextInputStyle.Paragraph)

        const playerIdActionRow = new ActionRowBuilder().addComponents(playerIdInput);
        const reasonActionRow = new ActionRowBuilder().addComponents(reasonInput);

        modal.addComponents(playerIdActionRow, reasonActionRow);

        await interaction.showModal(modal)
	},
};