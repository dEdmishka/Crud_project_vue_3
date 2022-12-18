import http from '../../http-common.js';

class DepartmentDataService {
    getAll() {
        return http.get('/department');
    }

    getAllFaculty() {
        return http.get('/department');
    }

    get(id) {
        return http.get(`/department/${id}`);
    }

    create(data) {
        return http.post('/department', data);
    }

    update(id, data) {
        return http.put(`/department/${id}`, data);
    }

    delete(id) {
        return http.delete(`/department/${id}`);
    }
}

export default new DepartmentDataService();