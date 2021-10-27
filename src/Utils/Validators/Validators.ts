export type FieldValidatortype = (value: string) => string | undefined


export const required: FieldValidatortype = (value) => {
    if (value) return undefined;
    return 'Field is required';

}

export const maxLenghtCreator = (maxLenght:number):FieldValidatortype => value => {
    if (value.length > maxLenght) return `Max lenght is ${maxLenght} symbols`;
    return undefined;

}
