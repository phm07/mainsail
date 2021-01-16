import Vue from 'vue'
import { getDefaultState } from './index'

const objectAssignDeep = require(`object-assign-deep`);

export default {
	reset(state) {
		Object.assign(state, getDefaultState())
	},

	setData(state, payload) {
		if ("state" in payload) payload = payload.state
		if ("gui" in payload) payload = payload.gui

		Object.entries(payload).forEach(([key, value]) => {
			if (typeof value === 'object') {
				Object.entries(value).forEach(([key2, value2]) => {
					Vue.set(state[key], key2, value2)
				})
			} else Vue.set(state, key, value)
		})
	},

	// override special setting
	setSettings(state, data) {
		state = objectAssignDeep(state, data)
	},

	setHeaterChartVisibility(state, payload) {
		let index = state.dashboard.hiddenTempChart.indexOf(payload.name.toUpperCase())

		if (payload.hidden && index === -1) state.dashboard.hiddenTempChart.push(payload.name.toUpperCase())
		else if (payload.hidden !== true && index > -1) state.dashboard.hiddenTempChart.splice(index, 1)
	},

	setGcodefilesMetadata(state, data) {
		if (data.value && state.gcodefiles.hideMetadataColums.includes(data.name)) {
			state.gcodefiles.hideMetadataColums.splice(state.gcodefiles.hideMetadataColums.indexOf(data.name), 1)
		} else if (!data.value && !state.gcodefiles.hideMetadataColums.includes(data.name)) {
			state.gcodefiles.hideMetadataColums.push(data.name)
		}
	},

	setGcodefilesShowHiddenFiles(state, value) {
		Vue.set(state.gcodefiles, "showHiddenFiles", value)
	},

	addPreset(state, preload) {
		window.console.log(state.presets)
		window.console.log(preload)
	}
}