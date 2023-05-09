import React, { useState, useCallback, useEffect } from 'react'
import { Button, Input, Form, Spin, Modal } from 'antd'
import { LOGO } from '@/constants'
import axios from 'axios'
import './index.scss'

const Home = () => {
  /* 加载动画 */
  useEffect(() => {
    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: 40,
          density: {
            enable: true,
            value_area: 500,
          },
        },
        color: {
          value: '#33BABB',
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000',
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 0.1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 10,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#99DDDB',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab',
          },
          onclick: {
            enable: true,
            mode: 'push',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  }, [])

  const [loading, setLoading] = useState(false)
  const [successUrl, setSuccessUrl] = useState('')

  const getStatus = useCallback((BUCKET_NAME:string) => new Promise((resolve, reject) => {
    let intervalTimer:any = null

    // 最多5分钟
    const rejectTimer = setTimeout(() => {
      reject(reject)
      clearInterval(intervalTimer)
    }, 300000)

    intervalTimer = setInterval(async() => {
      const res = await axios.post('https://y7lnyy.laf.dev/get_status', {
        BUCKET_NAME
      })

      if (res.data.status === 1) {
        clearInterval(intervalTimer)
        clearTimeout(rejectTimer)
        resolve(res.data)
      }
    }, 5000)
  }), [])

  const onFinish = useCallback(async(data) => {
    setLoading(true)

    try {
      // TODO 提交表单
      await axios.post('https://y7lnyy.laf.dev/add_task', {
        data,
      })

      await getStatus(data.BUCKET_NAME)

      const BUCKET_NAME = data.BUCKET_NAME
      const url = data.url
      const domain = url.split('/')[ 2 ].split('.').slice(-2).join('.')

      setSuccessUrl(`https://${ BUCKET_NAME }.site.${ domain }`)
    } catch (err:any) {
      console.log(err)
      alert(err?.message || `出现了点意外~`)
    }
    setLoading(false)
  }, [getStatus])

  return (
    <div className="home-welcome">
      <div
        id="particles-js"
        className="animation" />
      <div className="logo">
        <img
          src={LOGO}
          alt="" />
      </div>
      <h1>三分钟</h1>
      <h1>拥有你的 AI 助手</h1>
      <Form
        className="form"
        name="basic"
        labelCol={{ span: 24 }}
        style={{ width: '100%', maxWidth: 500 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="云函数地址"
          name="url"
          rules={[{
            required: true,
            message: '',
          }, {
            validator: (_, value) => {
              const reg = /^https:\/\/[a-z0-9]{6,}\.[a-z0-9]{1,}\.[a-z0-9]{1,}\/[a-z0-9_]{1,}$/

              if (!reg.test(value)) {
                return Promise.reject('云函数地址格式不正确')
              }
              return Promise.resolve()
            }
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="访问凭证(PAT)"
          name="pat"
          rules={[{ required: true, message: '' }, {
            validator: (_, value) => {
              const reg = /^laf_/

              if (!reg.test(value)) {
                return Promise.reject('访问凭证必须以 laf_ 开头')
              }
              return Promise.resolve()
            }
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="存储桶名称"
          name="BUCKET_NAME"
          rules={[{ required: true, message: '' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item >
          <div className='btns'>
            <Button
            >
            查看教学视频
            </Button>
            <Button
              type="primary"
              htmlType="submit"
            >
            确认上传
            </Button>
          </div>
        </Form.Item>
        {
          loading && (
            <div className='loading'>
              <Spin
                tip="请求中，大约2~3分钟"
                size="large">
              </Spin>
            </div>
          )
        }
      </Form>

      <Modal
        title="上传成功"
        open={!!successUrl}
        onOk={() => window.open(successUrl, '_blank')}
        onCancel={() => setSuccessUrl('')}
      >
        <p>上传 AI 应用成功，访问地址为：<span style={{ userSelect: 'all' }}>{successUrl}</span></p>
        <p>点击确定立即打开</p>
      </Modal>
    </div>
  )
}

export default Home
