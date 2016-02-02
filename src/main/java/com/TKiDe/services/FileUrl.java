package com.TKiDe.services;

import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
//@XmlAccessorType(XmlAccessType.FIELD)
public class FileUrl {
  String url;

  public FileUrl(String url) {
    this.url = url;
  }

  public FileUrl() {
  }
}
