'use strict';

/**
 * Проверяет можно ли перезапустить соединение
 *
 * @param object error Объект ошибки
 *
 * @return boolean
 */
exports._checkConnectReject = (error) => {
	if (error.code === 'ETIMEDOUT') {
		return false;
	}

	if (error.code === 'ECONNRESET') {
		return true;
	}

	if (error.code === 'ECONNREFUSED') {
		return true;
	}

	return error.statusCode > 500;
};

/**
 * Обработка ошибок VK API
 */
exports.ApiError = class ApiError extends Error {
	/**
	 * Конструктор
	 *
	 * @param object error Объект ошибки
	 */
	constructor (error) {
		super(error.error_msg);
		this.name = this.constructor.name;

		this.code = parseInt(error.error_code);
		this.message = error.error_msg;
		this.params = error.request_params;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this,this.constructor.name);
		}
	}
};

/**
 * Обаботка ошибок запроса
 */
exports.RequestError = class RequestError extends Error {
	/**
	 * Конструктор
	 *
	 * @param ErrorStatusCode error Объект ошибки
	 */
	constructor (error) {
		super(error);
		this.name = this.constructor.name;

		if ('statusCode' in error) {
			this.statusCode = error.statusCode;
		}

		if ('message' in error) {
			this.message = error.message;
		}

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this,this.constructor.name);
		}
	}
}

/**
 * Обработка неизвестный ошибок
 */
exports.UnknownError = class UnknownError extends Error {
	/**
	 * Конструктор
	 *
	 * @param mixed error
	 */
	constructor (error) {
		super(error);
		this.name = this.constructor.name;

		this.message = error;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this,this.constructor.name);
		}
	}
}
