import request from '@/utils/request'

function getOverviewData(params) {
    return request({
        url: '/v1/monitor/get_overview_data/',
        method: 'get',
        params
    }) 
}

function getNodeOverviewData(params) {
    return request({
        url: '/v1/monitor/get_node_overview_data',
        method: 'get',
        data: params
    })
}

function getCPUMonitor(params) {
    return request({
        url: '/v1/monitor/get_cpu_monitor',
        method: 'get',
        data: params
    })
}

function getMEMMonitor(params) {
    return request({
        url: '/v1/monitor/get_mem_monitor',
        method: 'get',
        data: params
    })
}

function getNetworkMonitor(params) {
    return request({
        url: '/v1/monitor/get_network_monitor',
        method: 'get',
        data: params
    })
}

function getNodeCPUMonitor(params) {
    return request({
        url: '/v1/monitor/get_node_cpu_monitor',
        method: 'get',
        data: params
    })
}

function getNodeMEMMonitor(params) {
    return request({
        url: '/v1/monitor/get_node_mem_monitor',
        method: 'get',
        data: params
    })
}

function getNodeNETMonitor(params) {
    return request({
        url: '/v1/monitor/get_node_network_monitor',
        method: 'get',
        data: params
    })
}

export default {
    getOverviewData,
    getNodeOverviewData,
    getCPUMonitor,
    getMEMMonitor,
    getNetworkMonitor,
    getNodeCPUMonitor,
    getNodeMEMMonitor,
    getNodeNETMonitor
}
