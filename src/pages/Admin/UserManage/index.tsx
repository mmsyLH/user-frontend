import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {useRef} from "react";
import {searchUsers} from "@/services/ant-design-pro/api";
import moment from "moment";
const columns: ProColumns< API.CurrentUser>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
  },
  {
    title: '星球编号',
    dataIndex: 'plantCode',
    copyable: true,
  },
  {
    title: '注册账号',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueEnum: {
      0: { text: '男' },
      1: { text: '女' },
    },
  },
  {
    title: '用户头像',
    dataIndex: 'avatarUrl',
    copyable: true,
  },
  {
    title: '密码',
    dataIndex: 'userPassword',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '用户状态',
    dataIndex: 'userStatus',
    valueEnum: {
      0: { text: '正常' },
      1: { text: '异常' },
      2: { text: '其他' },
    },
  },

  {
    title: '电话',
    dataIndex: 'phone',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
  {
    title: '用户权限',
    dataIndex: 'userRole',
    valueType:"select",
    valueEnum: {
      0: { text: '普通用户' ,status:"Default"},
      1: { text: '管理员', status:"Success"},
    },
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: (text, record) => (
      <>
        <TableDropdown
          key={record.id} // 假设record中有一个唯一的id作为key
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />
      </>
    ),
  },
];

export default () => {
    const actionRef = useRef<ActionType>();

    // 定义日期格式化函数
    const dateFormatter = (text: string) => {
        return moment(text).format('YYYY-MM-DD HH:mm:ss'); // 使用 moment 库格式化日期
    };

    return (
        <ProTable<API.CurrentUser>
          // @ts-ignore
            columns={columns.map((col) => {
                if (col.dataIndex === 'createTime' || col.dataIndex === 'updateTime') {
                    return {
                        ...col,
                        render: (text: string) => dateFormatter(text), // 设置需要格式化日期的字段的 render 属性
                    };
                }
                return col;
            })}
            actionRef={actionRef}
            rowKey="id"
            pagination={{
                showQuickJumper: true,
            }}
            search={{
                layout: 'vertical',
                defaultCollapsed: false,
            }}
            dateFormatter="string"
            toolbar={{
                title: '高级表格',
                tooltip: '这是一个标题提示',
            }}
            request={async (params, sort, filter) => {
                const userList = await searchUsers();
                return {
                    data: userList,
                };
            }}
        />
    );
};
