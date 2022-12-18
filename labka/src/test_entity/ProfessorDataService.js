import http from '../../http-common.js';

class ProfessorDataService {
    getAll() {
        return http.get('professors');
    }

    get(id) {
        return http.get(`/professors/${id}`);
    }

    create(data) {
        return http.post('professors', data);
    }

    update(id, data) {
        return http.put(`/professors/${id}`, data);
    }

    delete(id) {
        return http.delete(`/professors/${id}`);
    }
}

export default new ProfessorDataService();