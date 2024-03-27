import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  // Menu  ,
  // Submenu  ,
  // MenuItem,
  // MenuItemGroup ,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  // Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  MessageBox,
  // Breadcrumb,
  // BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  // Alert,
  Notification,
  Slider,
  Loading,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Message,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  // Carousel,
  // CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  // Container,
  // Header,
  // Aside,
  // Main,
  // Footer,
  //  PageHeader,
  Timeline,
  TimelineItem,
  // Link,
  Divider,
  Image,
  Backtop,
  // InfiniteScroll,
  // Calendar,
  // CascaderPanel,
  // Scrollbar,
  // Avatar,
  Drawer,
  Statistic,
  Popconfirm,
  // Skeleton,
  // SkeletonItem,
  Empty,
  Descriptions,
  DescriptionsItem,
  Result
} from 'element-ui';

// 修改组件库默认值
const clearable = { type: Boolean, default: true }
Input.props.clearable = clearable
Select.props.clearable = clearable
Cascader.props.clearable = clearable
TimePicker.props.clearable = clearable
DatePicker.props.clearable = clearable
const filterable = { type: Boolean, default: true }
Select.props.filterable = filterable
Cascader.props.filterable = filterable

export function registComponents(Vue) {
  Vue.use(Pagination);
  Vue.use(Dialog);
  Vue.use(Autocomplete);
  Vue.use(Dropdown);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
  // Vue.use(Menu);
  // Vue.use(Submenu);
  // Vue.use(MenuItem);
  // Vue.use(MenuItemGroup);
  Vue.use(Input);
  Vue.use(InputNumber);
  Vue.use(Radio);
  Vue.use(RadioGroup);
  Vue.use(RadioButton);
  Vue.use(Checkbox);
  Vue.use(CheckboxButton);
  Vue.use(CheckboxGroup);
  Vue.use(Switch);
  Vue.use(Select);
  Vue.use(Option);
  Vue.use(OptionGroup);
  Vue.use(Button);
  Vue.use(ButtonGroup);
  // Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(DatePicker);
  Vue.use(TimeSelect);
  Vue.use(TimePicker);
  Vue.use(Popover);
  Vue.use(Tooltip);
  // Vue.use(Breadcrumb);
  // Vue.use(BreadcrumbItem);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Tabs);
  Vue.use(TabPane);
  Vue.use(Tag);
  Vue.use(Tree);
  // Vue.use(Alert);
  Vue.use(Slider);
  Vue.use(Icon);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Upload);
  Vue.use(Empty);
  Vue.use(Result);
  Vue.use(Drawer);
  Vue.use(Statistic);
  Vue.use(Popconfirm);
  Vue.use(Progress);
  Vue.use(Spinner);
  Vue.use(Badge);
  Vue.use(Card);
  Vue.use(Rate);
  Vue.use(Steps);
  Vue.use(Step);
  // Vue.use(Carousel);
  // Vue.use(CarouselItem);
  Vue.use(Collapse);
  Vue.use(CollapseItem);
  Vue.use(Cascader);
  Vue.use(Descriptions);
  Vue.use(DescriptionsItem);
  Vue.use(ColorPicker);
  Vue.use(Transfer);
  // Vue.use(Container);
  // Vue.use(Header);
  // Vue.use(Aside);
  // Vue.use(Main);
  // Vue.use(Footer);
  // Vue.use(PageHeader);
  Vue.use(Timeline);
  Vue.use(TimelineItem);
  // Vue.use(Link);
  Vue.use(Divider);
  Vue.use(Image);
  Vue.use(Backtop);
  // Vue.use(InfiniteScroll);
  // Vue.use(Calendar);
  // Vue.use(CascaderPanel);
  // Vue.use(Scrollbar);


  Vue.use(Loading.directive);
  Vue.prototype.$loading = Loading.service;
  const { alert, confirm, prompt } = MessageBox;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = alert;
  Vue.prototype.$confirm = confirm;
  Vue.prototype.$prompt = prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;
}
