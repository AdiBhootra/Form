import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersAction } from "../../feature/UserSlice";
import "antd/dist/antd.css";
import antd, { Table, Button, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import FormPage from "../Form-section/FormPage";
import { RootState } from "../../app/Store"
import { fetchApiData } from "../../services/usersApi"

const ShowData = () => {

  const users = useSelector((state:RootState) => state.user.users);
  const isLoading = useSelector((state:RootState) => state.user.isLoading);

  const dispatch:any = useDispatch();

  // const [dataSource, setDataSource] = useState<any>([]);
  const [isEditing, setIsEditing] = useState<any>(false);
  const [editingData, setEditingData] = useState<any>([null]);


  useEffect(() => {
    dispatch(fetchApiData());
  }, [dispatch]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: 'id'
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
    },

    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Number",
      dataIndex: "phone",
    },

    {
      title: "Website",
      dataIndex: "website",
    },
    {
      title: "actions",
      key: "actions",
      render: (record: any) => {
        return (
          <>
            <button  onClick={() =>editHandler(record)} >
             Edit
            </button>
            <button
              onClick={() => {
                deleteHandler(record);
              }}
              style={{ color: "red", marginLeft:2 }}
            > Delete </ button>
          </>
        );
      },
    },
  ];

  const editHandler = (record: any) => {
    setIsEditing(true);
    setEditingData({ ...record });
  };

  const deleteHandler = (record: any) => {
    Modal.confirm({
      title: "are you want to delete the Data?",
      onOk: () => {
        dispatch(usersAction.removeUser(record.id));
        // setDataSource((pre: any[]) => {
        //   return pre.filter(
        //     (newData: { id: number }) => newData.id !== record.id
        //   );
        // });
      },
    });
  };

  const reset = () => {
    setIsEditing(false);
    setEditingData(null);
  };

  // const fetchData = () => {
  //   fetch("https://jsonplaceholder.typicode.com/users").then((response) => {
  //     response.json().then((data) => {
  //       setDataSource(data);
  //       setPage(data);
  //     });
  //   });
  // };

  // setDataSource([...dataSource,user])
  return (
    <div>
      <div>
        <FormPage />
      </div>
      {isLoading ? <p>Loading...</p> :
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Table
          className="table"
          dataSource={users}
          columns={columns}
          rowKey = 'id'
          pagination={{
            pageSize: 5,
          }}
        /> 
        <Modal
          title="Edit Data"
          visible={isEditing}
          onCancel={() => {
            reset();
          }}
          onOk={() => {
            dispatch(usersAction.updateUser({
              id: editingData.id,
              name: editingData.name,
              username: editingData.username,
              email: editingData.email,
              phone: editingData.phone,
              website: editingData.website
            }));

            // setDataSource((pre: { id: any }[]) => {
            //   return pre.map((data: { id: any }) => {
            //     if (data.id === editingData.id) {
            //       return editingData;
            //     } else {
            //       return data;
            //     }
            //   });
            // });
            reset();
          }}
        >
          <Input
            value={editingData?.name}
            onChange={(e) => {
              setEditingData((pre: any) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />

          <Input
            value={editingData?.username}
            onChange={(e) => {
              setEditingData((pre: any) => {
                return { ...pre, username: e.target.value };
              });
            }}
          />

          <Input
            value={editingData?.email}
            onChange={(e) => {
              setEditingData((pre: any) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />

          <Input
            value={editingData?.phone}
            onChange={(e) => {
              setEditingData((pre: any) => {
                return { ...pre, phone: e.target.value };
              });
            }}
          />
          <Input
            value={editingData?.website}
            onChange={(e) => {
              setEditingData((pre: any) => {
                return { ...pre, phone: e.target.value };
              });
            }}
          />
        </Modal>
      </div> }
    </div>
  );
};

export default ShowData;
