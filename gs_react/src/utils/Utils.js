export const arrayFromNum = (number) => {
    const arr = []

    for(let i = 1; i < number + 1; i++)
        arr.push(i);

    return arr;
}
