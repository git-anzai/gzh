<template>
  <Content :style="{padding: '0 16px 16px'}">
    <Card>
        <div :style="{minHeight:contentHeight+'px'}">
          <Form :label-width="80" ref="formInline" inline>
            <FormItem label="商品名称">
              <Input type="text" placeholder="" v-model="searchData.goodsName"></Input>
            </FormItem>
            <FormItem label="分类">
              <Select style="width:160px;" v-model="searchData.class_1">
                <Option v-for="(item,key) in classList" :value="item.id" :key="key">{{item.class_name}}</Option>
              </Select>
            </FormItem>
            <FormItem :label-width="10">
              <Button type="primary" @click="searchGoods()">查询</Button>
            </FormItem>
            <FormItem :label-width="10">
              <Button type="success" @click="addGoodsModal = true">添加货品</Button>
            </FormItem>
          </Form>

          <Modal
            v-model="addGoodsModal"
            title="添加货品"
            @on-ok="addGoods('addGoodsForm')">
            <Form :label-width="100" :rules="addGoodsRule" :model="addGoodsData" ref="addGoodsForm" inline>
              <FormItem label="标题：" prop="title">
                <Input type="text" placeholder="请输入货品名称" v-model="addGoodsData.title" :style="{width:'170px'}"></Input>
              </FormItem>
              <FormItem label="封面：">
                <div class="demo-upload-list">
                  <img :src="addGoodsData.goods_cover" v-if="addGoodsData.goods_cover">
                </div>
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  multiple
                  :data="uploadData"
                  type="drag"
                  action="https://www.zdzzk.com/App/Goods/uploadImg"
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
              </FormItem>
              <FormItem label="描述：" prop="introduce">
                <Input type="text" :style="{width:'170px'}" placeholder="请输入商品介绍" v-model="addGoodsData.introduce"></Input>
              </FormItem>
              <FormItem label="详情图片：">
                <div class="demo-upload-list" v-for="item in uploadList"><img :src="item" v-if="item">
                </div>
                <Upload
                  ref="upload1"
                  :show-upload-list="false"
                  :on-success="handleSuccess1"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError1"
                  multiple
                  :data="uploadData"
                  type="drag"
                  action="https://www.zdzzk.com/App/Goods/uploadImg"
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
              </FormItem>
              <FormItem label="价格：" prop="price">
                <Input type="text" :style="{width:'100px'}" placeholder="请输入价格" v-model="addGoodsData.price"></Input>
              </FormItem>
              <FormItem label="品牌：" prop="classId">
                <Select style="width:160px;" v-model="addGoodsData.class_1">
                  <Option v-for="(item,key) in classList" :value="item.id" :key="key">{{item.class_name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="数量：" prop="stock">
                <Input type="text" :style="{width:'170px'}" placeholder="请输入商品数量" v-model="addGoodsData.stock"></Input>
              </FormItem>
            </Form>
          </Modal>


          <Modal
            v-model="editGoodsModal"
            title="添加货品"
            @on-ok="editGoods('editGoodsForm')">
            <Form :label-width="100" :rules="editGoodsRule" :model="editGoodsData" ref="editGoodsForm" inline>
              <FormItem label="标题：" prop="title">
                <Input type="text" placeholder="请输入货品名称" v-model="editGoodsData.title" :style="{width:'170px'}"></Input>
              </FormItem>
              <FormItem label="封面：">
                <div class="demo-upload-list">
                  <img :src="editGoodsData.goods_cover" v-if="editGoodsData.goods_cover">
                </div>
                <Upload
                  ref="upload3"
                  :show-upload-list="false"
                  :on-success="handleSuccess2"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  multiple
                  :data="uploadData"
                  type="drag"
                  action="https://www.zdzzk.com/App/Goods/uploadImg"
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
              </FormItem>
              <FormItem label="描述：" prop="introduce">
                <Input type="text" :style="{width:'170px'}" placeholder="请输入商品介绍" v-model="editGoodsData.introduce"></Input>
              </FormItem>
              <FormItem label="详情图片：">
                <div class="demo-upload-list" v-for="item in editGoodsData.imgUrl"><img :src="item" v-if="item">
                </div>
                <Upload
                  ref="upload4"
                  :show-upload-list="false"
                  :on-success="handleSuccess3"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError1"
                  multiple
                  :data="uploadData"
                  type="drag"
                  action="https://www.zdzzk.com/App/Goods/uploadImg"
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
              </FormItem>
              <FormItem label="价格：" prop="price">
                <Input type="text" :style="{width:'100px'}" placeholder="请输入价格" v-model="editGoodsData.price"></Input>
              </FormItem>
              <FormItem label="品牌：" prop="classId">
                <Select style="width:160px;" v-model="editGoodsData.class_1">
                  <Option v-for="(item,key) in classList" :value="item.id" :key="key">{{item.class_name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="数量：" prop="stock">
                <Input type="text" :style="{width:'170px'}" placeholder="请输入商品数量" v-model="editGoodsData.stock"></Input>
              </FormItem>
            </Form>
          </Modal>
          <Table :height="tableHeight" border ref="selection" :columns="pageData.columns" :data="pageData.data"
                 :loading="loading"></Table>
          <!--<Page style="text-align: right;margin-top: 10px;" :total="pageData.totalCount" show-elevator show-total  :page-size="pageData.pageSize" :current="pageData.pageCurrent+1" @on-change="handleChange"></Page>-->
        </div>
    </Card>
  </Content>
</template>

<script>
  export default {
    name: 'workBench',
    data() {
      return {
        contentHeight:0,
        tableHeight:0,
        loading: true,
        pageData: {
          columns: [{
              title: 'id',
              key: 'id',
              align: 'center',
            },
            {
              title: '名称',
              key: 'goods_name',
              align: 'center',
            },
            {
              title: '描述',
              key: 'goods_introduce',
              align: 'center',
            },
            {
              title: '价格',
              key: 'goods_price',
              align: 'center',
            },
            {
              title: '库存',
              key: 'goods_stock',
              align: 'center',
            },
            {
              title: '封面',
              // key: 'spBrand',
              align: 'center',
            },
            {
              title: '发布时间',
              key: 'goods_create',
              align: 'center',
            },
            {
              title: '操作',
              align: 'center',
              render: (h, params) => {
                let actionBtn = [];
                actionBtn = [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small',
                    },
                    style: {
                      marginRight: '4px'
                    },
                    on: {
                      click: () => {
                        let _this = this
                        _this.$Modal.confirm({
                          title: '提示',
                          content: `确定要删除此货品吗`,
                          cancelText: `取消`,
                          onOk() {
                            _this.deleteGoods(params.row.store_id, params.row.id);
                          }
                        })
                      }
                    }
                  }, '删除'),
                  h('Button', {
                    props: {
                      type: 'info',
                      size: 'small',
                    },
                    style: {
                      marginRight: '4px'
                    },
                    on: {
                      click: () => {
                        this.editGoodsModal = true
                        this.editGoodsData.imgUrl = params.row.goods_image
                        this.editGoodsData.title = params.row.goods_name
                        this.editGoodsData.introduce = params.row.goods_introduce
                        this.editGoodsData.price = params.row.goods_price
                        this.editGoodsData.goods_cover = params.row.goods_cover
                        this.editGoodsData.stock = params.row.goods_stock
                        this.editGoodsData.class_1 = params.row.goods_class_1
                        this.editGoodsData.goods_id = params.row.id
                      }
                    }
                  }, '编辑'),
                ]
                return h('div', actionBtn);
              }
            }],
          data: []
        },
        editGoodsModal:false,
        addGoodsModal: false,
        classList: [],
        uploadData: {
          userId: 999999
        },
        searchData: {
          storeId:1,
          goodsName: '',
          class_1: ''
        },
        editGoodsData:{
          title: '',
          introduce: '',
          price: '',
          type: 1,
          goods_cover: '',
          imgUrl: [],
          stock: '',
          change: 2,
          class_1: "",
          storeId: 1,
          goods_id:''
        },
        addGoodsData: {
          title: '',
          introduce: '',
          price: '',
          type: 1,
          goods_cover: '',
          imgUrl: [],
          stock: '',
          change: 1,
          class_1: "",
          storeId: 1
        },
        uploadList: [],
        addGoodsRule: {
          title: [{required: true, message: '请输入商品名称', trigger: 'blur'},
            {type: 'string', trigger: 'change'}
          ],
          introduce: [{required: true, message: '请输入商品描述', trigger: 'blur'},
            {type: 'string', trigger: 'change'}
          ],
          price: [{required: true, message: '请输入商品价格', trigger: 'blur'},
            {type: 'string', trigger: 'change'}
          ],
          stock: [{required: true, message: '请输入商品数量', trigger: 'blur'},
            {type: 'string', trigger: 'change'}
          ],
          classId: [{required: true, message: '请选择商品分类', trigger: 'blur'},
            {type: 'string', trigger: 'change'}]
        },
        editGoodsRule: {
          title: [{required: true, message: '请输入商品名称', trigger: 'blur'},
            {type: 'string', trigger: 'change'}
          ],
          introduce: [{required: true, message: '请输入商品描述', trigger: 'blur'},
            {type: 'string', trigger: 'change'}
          ],
          price: [{required: true, message: '请输入商品价格', trigger: 'blur'},
            {type: 'string', trigger: 'change'}
          ],
          stock: [{required: true, message: '请输入商品数量', trigger: 'blur'},
            {type: 'string', trigger: 'change'}
          ],
          classId: [{required: true, message: '请选择商品分类', trigger: 'blur'},
            {type: 'string', trigger: 'change'}]
        },
        arr:[]
      }
    },
    mounted() {
      this.contentHeight = Number(window.innerHeight - 70);
      this.tableHeight = Number(window.innerHeight - 130);
      this.getClassList();
      this.queryTable();
    },
    methods: {
      editGoods() {
        let params = {
          "service": this.Api.APP_GOODS_PUBLISHGOODS,
          "data": this.editGoodsData
        }
        this.$http.post(this.Api.APP_GOODS_PUBLISHGOODS, params).then(res => {
          if (res.code == "A00006") {
            this.queryTable();
          }
        })
      },
      deleteGoods(storeId,goodsId) {
        let params = {
          "service": this.Api.APP_GOODS_DELGOODS,
          "storeId": storeId,
          "goodsId": goodsId
        }
        this.$http.post(this.Api.APP_GOODS_DELGOODS, params).then(res => {
          if (res.code == "A00006") {
            this.queryTable();
          }
        })
      },
      searchGoods() {
        let params = {
          "service": this.Api.APP_GOODS_GOODSSEARCH,
          "data": this.searchData

        }
        this.$http.post(this.Api.APP_GOODS_GOODSSEARCH, params).then(res => {
          if (res.code == "A00006") {
            this.loading = false;
            this.pageData.data = res.data;
          }
        })
      },
      getClassList() {
        let params = {
          "service": this.Api.APP_GOODS_CLASSLIST,
          "data": {
            "type": 1,
          }
        }
        this.$http.post(this.Api.APP_GOODS_CLASSLIST, params).then(res => {
          if (res.code == "A00006") {
            this.classList = res.data
          }
        })
      },
      queryTable() {
        let params = {
          "service": this.Api.APP_GOODS_GOODSSTORELIST,
          "data": {
            "type": 1,
            "storeId": 1,
          }
        }
        this.$http.post(this.Api.APP_GOODS_GOODSSTORELIST, params).then(res => {
          if (res.code == "A00006") {
            this.loading = false;
            this.pageData.data = res.data;
          }
        })

      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleSuccess(res, file) {
        this.addGoodsData.goods_cover = res.data.imgName;
      },
      handleSuccess2(res, file) {
        this.editGoodsData.goods_cover = res.data.imgName;
      },
      handleSuccess3(res, file) {
        this.editGoodsData.imgUrl = this.arr;
        this.editGoodsData.imgUrl.push(res.data.imgName);
      },
      handleFormatError1(file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleSuccess1(res, file) {
        this.uploadList.push(res.data.imgName)
        this.addGoodsData.imgUrl.push(res.data.imgName)
      },
      addGoods() {
        let params = {
          "service": this.Api.APP_GOODS_PUBLISHGOODS,
          "data": this.addGoodsData
        }
        this.$http.post(this.Api.APP_GOODS_PUBLISHGOODS, params).then(res => {
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
