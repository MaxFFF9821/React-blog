import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState, useEffect } from 'react'
import { message } from 'antd'

import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import { createArticleAPI, getArticleDetailAPI} from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {

  const { channelList} = useChannel()
  
  const onFinish = (formValue) => {
    // console.log(formValue);
    // 封装借口函数

    if (imageList.length !== imageType ) return message.warning('封面类型和图片数量不匹配')
    const { title, content, channel_id,  } = formValue
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList
        .filter(item => item.response && item.response.data && item.response.data.url)
        .map(item => item.response.data.url)
      },
      channel_id
    }
    createArticleAPI(reqData)
    
  }
  const [imageList, setImageList]=useState([])
  const onUploadChange = (value) => {
    setImageList(value.fileList)
    
  }
  const[imageType, setImagetype] = useState(0)
  const onTypeChange = (e) => {
    setImagetype(e.target.value)
    
  }
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  const [form]=Form.useForm()
  console.log(articleId);
  
  useEffect(() => {
    async function  getArticleDetail(){
      const res = await getArticleDetailAPI(articleId)
      const data = res.data
      const {cover} = data
      form.setFieldsValue({
        ...data,
        type: cover.type
      })
      setImagetype(cover.type)
      setImageList(cover.images.map(url => {
        return {url}
      }))

    }
    if (articleId) {
      getArticleDetail()
    }
  },[articleId,form])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `${articleId ? 'edit' : 'publish'} ariticle` },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(item => <Option key={item.id} value={item.id}>{ item.name}</Option>)}
             
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 &&
              <Upload 
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              name= 'image'
                onChange={onUploadChange}
                maxCount={imageType}
                fileList={imageList}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
            
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
          className="publish-quill"
          theme="snow"
          placeholder="请输入文章内容"
        />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish