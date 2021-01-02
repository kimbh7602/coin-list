<template>
    <ul class="header-row">
        <li class="empty-header"></li>        
        <li class="name-header">자산</li>        
        <li class="price-header">Price</li>        
        <li class="hour-header">1H</li>        
        <li class="day-header">24H</li>        
        <li class="week-header">7D</li>        
        <li class="volume-header">24H Volume</li>        
    </ul>
</template>

<style>
.header-row {
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 30px;
    font-size: 11px;
    font-weight: bold;
    border-radius: 5px;
    color: #8c8c8c;
}

.empty-header {
    width: 5%;
}

.name-header {
    width: 27%;
}

.price-header {
    width: 22%;
    text-align: right;
}

.hour-header {
    width: 18%;
    text-align: right;
}
.day-header {
    width: 13%;
    text-align: right;
}
.week-header {
    width: 13%;
    text-align: right;
}

.volume-header {
    width: 25%;
    text-align: right;
}
</style>