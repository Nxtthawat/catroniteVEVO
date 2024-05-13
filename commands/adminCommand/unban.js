const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('clear player ban from Bangsaen')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const modal = new ModalBuilder()
        .setTitle("ยกเลิกการแบน")
        .setCustomId(`unbanModal - ${interaction.user.id}`);

        const playerIdInput = new TextInputBuilder()
        .setCustomId('playerId')
        .setRequired(true)
        .setLabel('Id ของผู้เล่นที่จะยกเลิกการแบน')
        .setStyle(TextInputStyle.Short)

        const playerIdActionRow = new ActionRowBuilder().addComponents(playerIdInput);

        modal.addComponents(playerIdActionRow);

        await interaction.showModal(modal)
	},
};