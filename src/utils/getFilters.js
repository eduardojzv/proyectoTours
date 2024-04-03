export default function getFilters(data) {
    return data.reduce((acc, { isla }) => {
        //islas
        acc.islas[isla.isla] = (acc.islas[isla.isla] || 0) + 1;
        //transportes
        // transportes.map((item)=>{
        //     acc.transportes[item] = (acc.transportes[item] || 0) + 1;
        // })
        return acc;
    }, {
        islas: {},
        //transportes: {}
    });
}