# Packet Viewer
Packet Viewerはパケットの中身を簡単に解析できるWebアプリケーションです。
解析したいパケットの可視化をさせることが目的です。
IPバージョンやプロトコル、送信元IPアドレス、宛先IPアドレス、TTLからOSの判別を行った結果をブラウザ上で表示させます。

Packet Viewer is a web application that allows you to easily analyze the contents of packets.
The purpose of this is to make you visualize the packets you want to analyze.
Displays the results of OS determination from IP version, protocol, source IP address, destination IP address, and TTL on the browser.

# 使い方(How to use)
解析したいパケットを入力欄に入れて表示ボタンを押下することで解析結果を表示させます。
表示させる際に出るアラートはパケットの解析情報です。

またWiresharkなどでキャプチャしたファイルなどを解析することも可能です。
その場合はファイル選択からキャプチャしたファイルを選択してください。
例としてキャプチャファイルもいくつか用意してあります。(Windowsパケット、Linuxパケット)


Put the packet you want to analyze into the input column and click the display button to display the analysis result.
The alerts that are displayed are packet analysis information.

It is also possible to analyze files captured by Wireshark and so on.
In this case, please select the captured file from the file selection.
Some capture files are provided as examples. (Windows packets, Linux packets)


![PacketViewer](https://user-images.githubusercontent.com/52772923/64474875-dbe4c700-d1b5-11e9-9b61-5d49b518c61a.png)
