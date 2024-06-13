import config from "./config.js"

function has_login() {
	var auth_token = uni.getStorageSync('auth_token')
	if (auth_token == '' || auth_token == null || auth_token == undefined) {
		uni.redirectTo({
			url: '/pages/auth/login'
		})
		return false
	}
}

function get_header(header, require_login) {
	if (!require_login) return header
	if (header == null) {
		header = {}
	}
	header['Authorization'] = uni.getStorageSync('auth_token')
	return header
}


function get(uri, data = null, header = null, require_login = false) {
	return uni.request({
		url: config.base_url + uri,
		data: data,
		header: get_header(header, require_login),
		method: 'GET'
	})
}

function post(uri, data = null, header = null, require_login) {
	return uni.request({
		url: config.base_url + uri,
		data: data,
		header: get_header(header, require_login),
		method: 'POST',
	})
}

function put(uri, data = null, header = null, require_login) {
	return uni.request({
		url: config.base_url + uri,
		data: data,
		header: get_header(header, require_login),
		method: 'PUT',
	})
}


function base_url(uri = '') {
	return config.base_url + uri
}

export default {
	get,
	post,
	put,
	base_url,
	has_login
}