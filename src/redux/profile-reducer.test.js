import React from 'react'
import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";
//test data
let state = {
    PostData: [
        { id: 1, message: "hi", likesCount: 5 },
        { id: 2, message: "Hello", likesCount: 12 },
    ]
};
let action = addPostActionCreator("Test text");

test('new post should be added', () => {   
    //action     
    let newState = profileReducer(state, action);

    //expectation
    expect(newState.PostData.length).toBe(3);
});

test('new post should contain test text', () => {
    //action     
    let newState = profileReducer(state, action);

    //expectation
    expect(newState.PostData[0].message).toBe("Test text");
});

test('PostData length should decrement after deleting', () => {
    //test data
    let action = deletePost(1);

    //action     
    let newState = profileReducer(state, action);   

    //expectation
    expect(newState.PostData.length).toBe(1);
});

test('PostData 1st post should contain set likesCount', () => {
    //test data
    let action = deletePost(1);

    //action     
    let newState = profileReducer(state, action);   

    //expectation
    expect(newState.PostData[0].likesCount).toBe(12);
});

test('PostData length should not decrement if incorrect id ', () => {
    //test data
    let action = deletePost(10);

    //action     
    let newState = profileReducer(state, action);   

    //expectation
    expect(newState.PostData.length).toBe(2);
});