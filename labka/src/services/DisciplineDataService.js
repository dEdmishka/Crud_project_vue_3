import http from '../../http-common.js';

class DisciplineDataService {
    getAll() {
        return http.get('/discipline');
    }

    get(id) {
        return http.get(`/discipline/${id}`);
    }

    create(data) {
        return http.post('/discipline', data);
    }

    update(id, data) {
        return http.put(`/discipline/${id}`, data);
    }

    delete(id) {
        return http.delete(`/discipline/${id}`);
    }
}

export default new DisciplineDataService();