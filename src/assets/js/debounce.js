// 防抖函数，立即执行版本 
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = [...arguments];
        if (timeout) clearTimeout(timeout);
        const callNow = !timeout;
        timeout = setTimeout(() => {
            timeout = null;
        }, wait);
        if (callNow) func.apply(context, args);
    };
}

export default debounce;