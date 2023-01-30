import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

const ListField = ({ name, label = 'Name', title }) => (
  <>
    <label style={{ textAlign: 'left', display: 'flex' }}>{title}</label>
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <div>
          {fields.map((field) => (
            <div
              key={field.key}
              style={{
                display: 'flex',
              }}
            >
              <Form.Item label={label}>
                <Input />
              </Form.Item>
              <Button
                icon={<CloseOutlined />}
                style={{ marginLeft: 5 }}
                onClick={() => remove(field.name)}
              ></Button>
            </div>
          ))}
          <Button onClick={add} style={{ display: 'flex' }}>
            Add
          </Button>
        </div>
      )}
    </Form.List>
  </>
);

export default ListField;
