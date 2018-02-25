import React, { Component } from 'react';
import createField from './create_field';

export default createField((input) => <input {...input} type="checkbox" />);
