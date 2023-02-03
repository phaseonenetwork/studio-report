import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

const ListField = ({ name, label = 'Name', title }) => (
  <>
    <label style={{ textAlign: 'left', display: 'flex' }}>{title}</label>
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <div
              key={field.key}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Form.Item name={name} {...field} label={label}>
                <Input />
              </Form.Item>
              <Button
                icon={<CloseOutlined />}
                style={{ marginLeft: 5, marginTop: 5 }}
                onClick={() => remove(field.name)}
                danger
              />
            </div>
          ))}
          <Button
            type="primary"
            onClick={() => add()}
            style={{
              display: 'flex',
              marginTop: '.5rem',
              marginBottom: '.5rem',
            }}
          >
            Add
          </Button>
        </>
      )}
    </Form.List>
  </>
);

export default ListField;
