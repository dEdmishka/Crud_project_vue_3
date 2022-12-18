import http from '../../http-common.js';

class ScheduleDataService {
    getAll() {
        return http.get('/schedule');
    }

    get(id) {
        return http.get(`/schedule/${id}`);
    }

    create(data) {
        return http.post('/schedule', data);
    }

    update(id, data) {
        return http.put(`/schedule/${id}`, data);
    }

    delete(id) {
        return http.delete(`/schedule/${id}`);
    }
}

export default new ScheduleDataService();