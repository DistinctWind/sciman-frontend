import request from "@/utils/request";

export const listAllLaboratories = () => {
    return request.get('/lab/listAll')
}