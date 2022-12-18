import http from '../../http-common.js';

class FaqDataService {
    getAll() {
        return http.get('/faq');
    }

    get(id) {
        return http.get(`/faq/${id}`);
    }

    create(data) {
        return http.post('/faq', data);
    }

    update(id, data) {
        return http.put(`/faq/${id}`, data);
    }

    delete(id) {
        return http.delete(`/faq/${id}`);
    }
}

export default new FaqDataService();