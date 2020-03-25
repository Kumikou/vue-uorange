<template>
  <div v-loading="loading">
    <!-- {{ addressList }} -->
    <div style="margin-bottom: 20px;text-align: center;font-size: xx-large;" v-if="createAddBtn">
        <el-button class="el-icon-circle-plus" style="width: 50%;height: 80px;" @click="handleCreateAdd">新增地址</el-button>
    </div>
    <div style="margin-bottom: 20px;" v-if="addressFormDiv">
      <el-form ref="form" :model="addressForm" label-width="100px">
        <el-form-item label="地区">
          <el-cascader
              v-model="areaDetail"
              :options="areaOptions"
              @change="handleAreaChange"
              style="width: 350px;"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="addressForm.addDetail" placeholder="请输入详细地址" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名">
          <el-input v-model="addressForm.name" placeholder="请输入收货人姓名" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="addressForm.phone" placeholder="请输入手机号" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-radio-group v-model="addressForm.tag">
            <el-radio :label="1">家</el-radio>
            <el-radio :label="2">公司</el-radio>
            <el-radio :label="3">学校</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveAdd">保存</el-button>
          <el-button type="infor" @click="hideAddForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="addressList" style="width: 100%;">
      <el-table-column prop="name" label="收货人" width="80"></el-table-column>
      <el-table-column  label="地区" width="240">
        <!-- {{ addressList.provinceId + '/' + addressList.cityId + addressList.areaId + addressList.streetId }} -->
        <template slot-scope="scope">
          {{ scope.row.provinceId | provinceFilter }}
          {{ scope.row.cityId | cityFilter }}
          {{ scope.row.areaId | areaFilter }}
          {{ scope.row.streetId | streetFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="addDetail" label="详细地址" width="100"></el-table-column>
      <el-table-column prop="phone" label="电话/手机" width="120"></el-table-column>
      <el-table-column prop="tag" label="标签" width="80" filter-placement="bottom-end" :filter-method="filterTag" :filters="[{ text: '家', value: 1 }, { text: '公司', value: 2 }, { text: '学校', value: 3 }]">
        <template slot-scope="scope">
          <el-tag :type="scope.row.tag | filterTagType"
                  disable-transitions>{{scope.row.tag | filterTagText}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isDefault" label="默认" width="80" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isDefault ? 'info' : 'success'"
                  disable-transitions>默认</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAddressList, delAddress, createAddress } from '@/api/personal'

export default {
  data () {
    return {
      addressList: [],
      createAddBtn: true,
      addressFormDiv: false,
      areaDetail: [],
      loading: true,
      addressForm: {
        addDetail: '',
        areaId: 0,
        cityId: 0,
        isDefault: true,
        name: '',
        phone: '',
        provinceId: 0,
        streetId: 0,
        tag: 0
      },
      areaOptions: [
        {
          label: '北京',
          value: 11,
          children: [{
            label: '北京市',
            value: 111,
            children: [
              {
                label: '朝阳区',
                value: 1111,
                children: [
                  {
                    value: 1,
                    label: '小关街道'
                  },
                  {
                    value: 2,
                    label: '三里屯街道'
                  }
                ]
              },
              {
                label: '海淀区',
                value: 1112,
                children: [
                  {
                    value: 3,
                    label: '八里庄街道'
                  },
                  {
                    value: 4,
                    label: '花园路街道'
                  }
                ]
              }
            ]
          }]
        },
        {
          label: '天津',
          value: 12,
          children: [{
            label: '天津市',
            value: 121,
            children: [
              {
                label: '和平区',
                value: 1211,
                children: [
                  {
                    value: 5,
                    label: '无暇街道'
                  },
                  {
                    value: 6,
                    label: '万新街道'
                  }
                ]
              },
              {
                label: '红桥区',
                value: 1212,
                children: [
                  {
                    value: 7,
                    label: '金桥街道'
                  }
                ]
              }
            ]
          }]
        },
        {
          label: '上海',
          value: 31,
          children: [{
            label: '上海市',
            value: 311,
            children: [
              {
                label: '虹口区',
                value: 3111,
                children: [
                  {
                    value: 8,
                    label: '东丽湖街道'
                  }
                ]
              },
              {
                label: '黄浦区',
                value: 3112,
                children: [
                  {
                    value: 9,
                    label: '马扬街道'
                  },
                  {
                    value: 10,
                    label: '梅江街道'
                  }
                ]
              }
            ]
          }]
        },
        {
          label: '重庆市',
          value: 50,
          children: [{
            label: '重庆市',
            value: 501,
            children: [
              {
                label: '奉节县',
                value: 5011,
                children: [
                  {
                    value: 11,
                    label: '尖山街道'
                  },
                  {
                    value: 12,
                    label: '杨村街道'
                  }
                ]
              },
              {
                label: '万州区',
                value: 5012,
                children: [
                  {
                    value: 13,
                    label: '武清农场'
                  },
                  {
                    value: 14,
                    label: '黄庄街道'
                  }
                ]
              }
            ]
          }]
        },
        {
          label: '河北省',
          value: 13
        },
        {
          label: '河南省',
          value: 41
        },
        {
          label: '云南省',
          value: 53
        },
        {
          label: '辽宁省',
          value: 21
        },
        {
          label: '黑龙江省',
          value: 23
        },
        {
          label: '湖南省',
          value: 43
        },
        {
          label: '安徽省',
          value: 34
        },
        {
          label: '山东省',
          value: 37
        },
        {
          label: '新疆维吾尔',
          value: 65
        },
        {
          label: '江苏省',
          value: 32
        },
        {
          label: '浙江省',
          value: 33
        },
        {
          label: '江西省',
          value: 36
        },
        {
          label: '湖北省',
          value: 42
        },
        {
          label: '广西壮族',
          value: 45
        },
        {
          label: '甘肃省',
          value: 62
        },
        {
          label: '山西省',
          value: 14
        },
        {
          label: '内蒙古',
          value: 15
        },
        {
          label: '陕西省',
          value: 61
        },
        {
          label: '吉林省',
          value: 22
        },
        {
          label: '福建省',
          value: 35
        },
        {
          label: '贵州省',
          value: 52
        },
        {
          label: '广东省',
          value: 44,
          children: [
            {
              label: '广州市',
              value: 441,
              children: [
                {
                  label: '天河区',
                  value: 4411,
                  children: [
                    {
                      value: 15,
                      label: '柯木塱街道'
                    },
                    {
                      value: 16,
                      label: '新华街道'
                    }
                  ]
                },
                {
                  label: '花都区',
                  value: 4412,
                  children: [
                    {
                      value: 17,
                      label: '黄花街道'
                    },
                    {
                      value: 18,
                      label: '迎宾大道'
                    }
                  ]
                }
              ]
            },
            {
              label: '深圳市',
              value: 442,
              children: [
                {
                  label: '宝安区',
                  value: 4421,
                  children: [
                    {
                      value: 19,
                      label: '友谊街道'
                    },
                    {
                      value: 20,
                      label: '林昕街道'
                    }
                  ]
                },
                {
                  label: '南山区',
                  value: 4422,
                  children: [
                    {
                      value: 21,
                      label: '娄丽街道'
                    },
                    {
                      value: 22,
                      label: '新启街道'
                    }
                  ]
                },
                {
                  label: '龙岗区',
                  value: 4423,
                  children: [
                    {
                      value: 23,
                      label: '海景街道'
                    },
                    {
                      value: 24,
                      label: '渠口街道'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: '青海省',
          value: 63
        },
        {
          label: '西藏',
          value: 54
        },
        {
          label: '四川省',
          value: 51
        },
        {
          label: '宁夏回族',
          value: 64
        },
        {
          label: '海南省',
          value: 46
        },
        {
          label: '天河区',
          value: 4411
        },
        {
          label: '花都区',
          value: 4412
        },
        {
          label: '宝安区',
          value: 4421
        },
        {
          label: '南山区',
          value: 4422
        },
        {
          label: '龙岗区',
          value: 4423
        }
      ]
    }
  },
  methods: {
    filterTag (value, row) {
      console.log(value + '  ' + row.tag)
      return row.tag === value
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      delAddress(row.addId).then(res => {
        console.log(res)
        if (res.data) {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.addressList.splice(index, 1)
        }
      })
    },
    handleAreaChange () {
      console.log('地区改变')
    },
    saveAdd () {
      this.loading = true
      this.addressForm.provinceId = this.areaDetail[0]
      this.addressForm.cityId = this.areaDetail[1]
      this.addressForm.areaId = this.areaDetail[2]
      this.addressForm.streetId = this.areaDetail[3]
      createAddress(this.addressForm).then(res => {
        if (res.code === 200) {
          this.loading = false
          this.$message({
            showClose: true,
            message: '添加地址成功',
            type: 'success'
          })
          window.reload()
        }
      })
      this.hideAddForm()
    },
    hideAddForm () {
      this.createAddBtn = true
      this.addressFormDiv = false
    },
    handleCreateAdd () {
      console.log(this.areaDetail)
      this.createAddBtn = false
      this.addressFormDiv = true
    }
  },
  filters: {
    filterTagText: function (tag) {
      const tagText = ['家', '公司', '学校']
      return tagText[tag - 1]
    },
    filterTagType: function (tag) {
      const type = ['', 'primary', 'success', 'info']
      return type[tag]
    },
    provinceFilter: function (provinceId) {
      var provinces = [{
        label: '北京',
        value: 11
      },
      {
        label: '天津',
        value: 12
      },
      {
        label: '上海',
        value: 31
      },
      {
        label: '重庆',
        value: 50
      }]
      var text = ''
      provinces.forEach(function (e) {
        if (e.value === provinceId) {
          text = e.label
        }
      })
      return text + ' '
    },
    cityFilter: function (cityId) {
      var cities = [{
        label: '北京市',
        value: 111
      },
      {
        label: '天津市',
        value: 121
      },
      {
        label: '上海市',
        value: 311
      },
      {
        label: '重庆市',
        value: 501
      },
      {
        label: '广州市',
        value: 441
      },
      {
        label: '深圳市',
        value: 442
      }
      ]
      var text = ''
      cities.forEach(function (e) {
        if (e.value === cityId) {
          text = e.label
        }
      })
      return text + ' '
    },
    areaFilter: function (areaId) {
      var areas = [
        {
          label: '朝阳区',
          value: 1111
        },
        {
          label: '海淀区',
          value: 1112
        },
        {
          label: '和平区',
          value: 1211
        },
        {
          label: '红桥区',
          value: 1212
        },
        {
          label: '虹口区',
          value: 3111
        },
        {
          label: '黄浦区',
          value: 3112
        },
        {
          label: '奉节县',
          value: 5011
        },
        {
          label: '万州区',
          value: 5012
        }
      ]
      var text = ''
      areas.forEach(function (e) {
        if (e.value === areaId) {
          text = e.label
        }
      })
      return text + ' '
    },
    streetFilter: function (streetId) {
      var streets = [
        {
          value: 1,
          label: '小关街道'
        },
        {
          value: 2,
          label: '三里屯街道'
        },
        {
          value: 3,
          label: '八里庄街道'
        },
        {
          value: 4,
          label: '花园路街道'
        },
        {
          value: 5,
          label: '无暇街道'
        },
        {
          value: 6,
          label: '万新街道'
        },
        {
          value: 7,
          label: '金桥街道'
        },
        {
          value: 8,
          label: '东丽湖街道'
        },
        {
          value: 9,
          label: '马扬街道'
        },
        {
          value: 10,
          label: '梅江街道'
        },
        {
          value: 11,
          label: '尖山街道'
        },
        {
          value: 12,
          label: '杨村街道'
        },
        {
          value: 13,
          label: '武清农场'
        },
        {
          value: 14,
          label: '黄庄街道'
        },
        {
          value: 15,
          label: '柯木塱街道'
        },
        {
          value: 16,
          label: '新华街道'
        },
        {
          value: 17,
          label: '黄花街道'
        },
        {
          value: 18,
          label: '迎宾大道'
        },
        {
          value: 19,
          label: '友谊街道'
        },
        {
          value: 20,
          label: '林昕街道'
        },
        {
          value: 21,
          label: '娄丽街道'
        },
        {
          value: 22,
          label: '新启街道'
        },
        {
          value: 23,
          label: '海景街道'
        },
        {
          value: 24,
          label: '渠口街道'
        }
      ]
      var text = ''
      streets.forEach(function (e) {
        if (e.value === streetId) {
          text = e.label
        }
      })
      return text
    }
  },
  mounted () {
    getAddressList().then(res => {
      console.log(res)
      this.addressList = res.data
      this.loading = false
    })
  }
}
</script>

<style>
</style>
