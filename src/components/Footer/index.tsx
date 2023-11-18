import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
    const defaultMessage = '罗汉出品';
    const currentYear = new Date().getFullYear();

    return (
        <DefaultFooter
            copyright={`${currentYear} ${defaultMessage}`}
            links={[
                {
                    key: 'Ant Design Pro',
                    title: 'Ant Design Pro',
                    href: 'https://pro.ant.design',
                    blankTarget: true,
                },
                {
                    key: 'github',
                    title: <GithubOutlined />,
                    href: 'https://github.com/1072344372',
                    blankTarget: true,
                },
                {
                    key: '备案号',
                    title: '黔ICP备2023011756号-1',
                    href: 'https://beian.miit.gov.cn/',
                    blankTarget: true,
                },
            ]}
        />
    );
};

export default Footer;
