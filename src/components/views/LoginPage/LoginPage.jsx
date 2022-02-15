import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { USER_SERVER } from '../../../Config';
import styled from 'styled-components';

const { Title } = Typography;

const ErrorFormMessage = styled.p`
  color: #ff000bf,
  fontSize: 0.7rem,
  border: 1px solid,
  padding: 1rem,
  borderRadius: 10px,
`;

const ForgotPassword = styled.a`
  float: right;
`;

const RegisterNow = styled.a`
  margin-left: 0.5rem;
  color: #1890ff;
`;

function LoginPage(props) {
  // const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('');
  // const [rememberMe, setRememberMe] = rememberMeChecked;
  const [rememberMe, setRememberMe] = useState(false);

  const initialEmail = localStorage.getItem('rememberMe')
    ? localStorage.getItem('rememberMe')
    : '';

  const handleRememberMe = () => {
    console.log('rememberMe click!');
    setRememberMe(!rememberMe);
  };

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(5, 'Password must be at least 5 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };

          const result = axios
            .post(`localhost:3000/${USER_SERVER}/login`, dataToSubmit)
            .then((response) => {
              console.log(response);
              return response.data;
            });

          // login 결과에 따른 처리 필요
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className='app'>
            <Title level={2}>Log In</Title>
            <form>
              <Form.Item name='email' rules={[{ required: true }]}>
                <Input
                  type='email'
                  id='email'
                  value={values.email}
                  prefix={
                    <MailOutlined style={{ color: 'rgba(0, 0, 0, .25' }} />
                  }
                  placeholder='Please input your email!'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? 'text-input error'
                      : 'text-input'
                  }
                  autoComplete='on'
                />
                {errors.email && touched.email && (
                  <div className='input-feedback'>{errors.email}</div>
                )}
              </Form.Item>
              <Form.Item name='password' rules={[{ required: true }]}>
                <Input
                  type='password'
                  id='password'
                  value={values.password}
                  prefix={
                    <LockOutlined style={{ color: 'rgba(0, 0, 0, .25' }} />
                  }
                  placeholder='Please input your password!'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password &&
                    touched.password && (
                      <div className='input-feedback'>{errors.password}</div>
                    )
                  }
                  autoComplete='on'
                />
              </Form.Item>
              {formErrorMessage && (
                <label>
                  <ErrorFormMessage placeholder={formErrorMessage} />
                </label>
              )}
              <Form.Item>
                <Checkbox
                  id='rememberMe'
                  onChange={handleRememberMe}
                  checked={rememberMe}
                >
                  Remember Me
                </Checkbox>
                <ForgotPassword
                  className='login-form-forgot'
                  href='/reset_user'
                >
                  forgot password
                </ForgotPassword>
                <div>
                  <Button
                    type='primary'
                    htmlType='submit'
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}
                    className='login-form-button'
                    style={{ minWidth: '100%' }}
                  >
                    Log In
                  </Button>
                </div>
                Or
                <RegisterNow href='/register'>register now :)</RegisterNow>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default LoginPage;
