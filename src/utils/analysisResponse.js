import {ElMessage} from "element-plus";

export const analysisResponse = (response) => {
    if (response.code === 0) {
        ElMessage({
            message: '操作成功',
            type: 'success'
        })
    } else if (response.code === 1) {
        ElMessage({
            message: response.message,
            type: 'error'
        })
    }
}