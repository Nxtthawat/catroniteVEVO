const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('clearwarn')
		.setDescription('clear player warn from Bangsaen')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const modal = new ModalBuilder()
        .setTitle("ล้างการเตือนผู้เล่น")
        .setCustomId(`clearWarnModal - ${interaction.user.id}`);

        const playerIdInput = new TextInputBuilder()
        .setCustomId('playerId')
        .setRequired(true)
        .setLabel('Id ของผู้เล่นที่จะยกเลิกการเตือน')
        .setStyle(TextInputStyle.Short)

        const playerIdActionRow = new ActionRowBuilder().addComponents(playerIdInput);

        modal.addComponents(playerIdActionRow);

        await interaction.showModal(modal)
	},
};