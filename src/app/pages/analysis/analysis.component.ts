import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { AnalysisService } from '../../core/services/Analysis/analysis.service';
import * as echarts from 'echarts';
import { IAnalysis } from '../../shared/interface/ianalysis';
import { AfterViewChecked } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-analysis',
  imports: [],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})
export class AnalysisComponent implements OnInit{
private readonly analysisService=inject(AnalysisService);
private readonly platformId=inject(PLATFORM_ID);
        userCount!:number;
        userTestCount!:number;
        testCount!: number;
        chartData: IAnalysis[] = [];
         colors:string[] = ['#e74c3c', '#9b59b6', '#3498db', '#2ecc71', '#f39c12', '#1abc9c', '#e67e22', '#34495e'];
         testDistributions: any[] = [];
         chartRendered:boolean= false;
        

  renderTestsUsageChart(transformedData:any[]): void {
    if (!isPlatformBrowser(this.platformId)) {
      // احنا دلوقتي على السيرفر، متعمليش حاجة
      return;
    }
    const chartDom = document.getElementById('testsUsageChart');
    if (!chartDom) {
      console.warn('عنصر الرسم غير موجود!');
      return;
    }
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        data: transformedData.map(item => item.name)
      },
      series: [
        {
          name: 'نسبة الاستخدام',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          roseType: 'radius',
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}: {d}%'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          data:transformedData
        }
      ]
    };

    myChart.setOption(option);
  
}
renderAllCharts(): void {
  if (!isPlatformBrowser(this.platformId)) {
    // احنا دلوقتي على السيرفر، متعمليش حاجة
    return;
  }
  this.testDistributions.forEach((test, index) => {
    const chartDom = document.getElementById(`chart-${index}`);
    if (!chartDom) return;

    const chart = echarts.init(chartDom);
    chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: ['طبيعي', 'خفيف', 'متوسط', 'شديد']
      },
      series: [
        {
          name: `توزيع نتائج ${test.testName}`,
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 18,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: test.naturalRatio, name: 'طبيعي', itemStyle: { color: '#2ecc71' } },
            { value: test.lightRatio, name: 'خفيف', itemStyle: { color: '#3498db' } },
            { value: test.moderateRatio, name: 'متوسط', itemStyle: { color: '#f39c12' } },
            { value: test.severeRatio, name: 'شديد', itemStyle: { color: '#e74c3c' } }
          ]
        }
      ]
    });
  });
}


ngOnInit(): void {
  this.analysisService.getAllAnalysis().subscribe({
    next:(res)=>{
      // console.log(res);
      this.userCount=res.data.userCount;
      this.userTestCount=res.data.userTestCount;
      this.testCount=res.data.testCount;
      this.chartData=res.data.testCounts;
      this.testDistributions=res.data.resultCounts;
      const transformedData = this.chartData.map((item, index) => ({
        value: item.ratio,
        name: item.testName,
        itemStyle:{ color: this.colors[index % this.colors.length] }
      }));
      setTimeout(() => {
        this.renderTestsUsageChart(transformedData);
      }, 0);
     
      setTimeout(() => {
        this.renderAllCharts();
      }, 0);
    }

  })


}




}
