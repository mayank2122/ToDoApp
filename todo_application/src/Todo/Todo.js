import { Button, Typography, List, Modal, Form, Input, Space } from "antd";
import React, { useCallback, useState } from "react";
const { Text, Title } = Typography;

export const Todo = () => {
  const [form] = Form.useForm();
  const [addTodo, setAddTodo] = useState([
    {
      id: 0,
      task: "Cooking",
    },
    {
      id: 1,
      task: "Eating",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTask = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteTask = useCallback(
    (idx) => {
      console.log("deleteTask", idx);
      const res = addTodo?.filter((data) => data?.id != idx);
      setAddTodo(res);
    },
    [addTodo]
  );

  const handleFinsh = (value) => {
    if (value.task) {
      setAddTodo((prev) => {
        let idx = prev?.length - 1;
        const addtaskValue = {
          id: idx + 1,
          task: value.task,
        };

        const res = [...prev, addtaskValue];
        return res;
      });
      console.log("valuesss", value);

      setIsModalOpen(false);
    }
  };

  console.log("HandleIdsss", addTodo);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      <List
        style={{ width: "70%", height: "70vh", overflow: "auto" }}
        size="small"
        header={
          <div>
            <Title level={3}>Todo List</Title>
          </div>
        }
        footer={
          <div>
            <Button type="primary" onClick={addTask}>
              Add Task
            </Button>
          </div>
        }
        bordered
        dataSource={addTodo}
        renderItem={(item, idx) => (
          <List.Item>
            <Space size={[500, 500]}>
              <Text>{item.task}</Text>
              <Button
                danger
                onClick={() => {
                  deleteTask(idx);
                }}
              >
                delete
              </Button>
            </Space>
          </List.Item>
        )}
      />
      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        <Form layout="vertical" onFinish={handleFinsh} form={form}>
          <Form.Item label="Enter the task" name="task">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Ok
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
