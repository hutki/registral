<?php
class SymixCapcha
{
	var $dir_font = "font/";
	var $dir_background = "background/";
    var $word = "";
    var $im_width = 0;
    var $im_height = 0;
	var $word_len = 0;
	var $chartypes = "all";

    function SymixCapcha($w=120, $h=40, $len=6, $chartypes="all") 
	{
		session_start();
        $this->dir_font = dirname(__FILE__) . '/'.$this->dir_font;
		$this->dir_background = dirname(__FILE__) . '/'.$this->dir_background;
        $this->im_width = $w;
        $this->im_height = $h;
		$this->word_len = $len;
		$this->chartypes = $chartypes;
		$this->set_veriword();
    }

    function set_veriword() 
	{
        $this->word  = $this->rnd_str($this->word_len, $this->chartypes);
        $_SESSION['symix_capcha'] = $this->word;
    }
	
	function check_veriword($str)
	{
		session_start();
		if($_SESSION['symix_capcha'] == $str)
			return true;
		return false;
	}
	
	function rnd_str($length = 6, $chartypes = "all")
	{
		$chartypes_array=explode(",", $chartypes);
		$lower = 'abcdefghijklmnopqrstuvwxyz';
		$upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$numbers = '1234567890';
		$special = '^@*+-+%()!?';
		$chars = "";
		if (in_array('all', $chartypes_array)) 
		{
			$chars = $lower . $upper. $numbers . $special;
		} 
		else 
		{
			if(in_array('lower', $chartypes_array))
				$chars = $lower;
			if(in_array('upper', $chartypes_array))
				$chars .= $upper;
			if(in_array('numbers', $chartypes_array))
				$chars .= $numbers;
			if(in_array('special', $chartypes_array))
				$chars .= $special;
		}
		$chars_length = strlen($chars) - 1;
		$string = $chars{rand(0, $chars_length)};
		for ($i = 1; $i < $length; $i = strlen($string)) 
		{
			$random = $chars{rand(0, $chars_length)};
			if ($random != $string{$i - 1})
				$string .= $random;
		}
		return $string;
	}

    function output_image(){
        $this->draw_image();
        header("Content-type: image/jpeg");
        imagejpeg($this->im);
    }

    function draw_text(){
        $dir = dir($this->dir_font);
        $fontstmp = array();
		$color_array = array("red");
        while (false !== ($file = $dir->read()))
		{
            if(substr($file, -4) == '.ttf') 
			{
                $fontstmp[] = $this->dir_font.$file;
            }
        }
        $dir->close();
        $text_font = (string) $fontstmp[array_rand($fontstmp)];
        $text_angle = rand(-9,9);
		$delta = 0.8;
		$flag = false;
		do
		{
			$text_size = $this -> im_height * $delta;
			$box = imagettfbbox ( $text_size, 0, $text_font, $this->word);
			$text_width = $box[2]-$box[0];
			$text_height= $box[5]-$box[3];
			if($this->im_width > $text_width)
			{
				$text_x = ($this->im_width - $text_width*0.95)/2;
				$flag = false;
			}
			else 
			{
				$flag = true;
				$delta -= 0.05;
			}
		}while($flag);
		$text_y = $this->im_height *0.4;
        $im_text = imagecreate ($this->im_width, $this->im_height);
        $bg_color = imagecolorallocate ($im_text, 255, 255, 255);
		$x_rand = $text_x;
		for($i = 0; $i < $this->word_len; $i++)
		{
			$text_angle = rand(-7,7);
			$box = imagettfbbox ( $text_size, 0, $text_font, $this->word[$i]);
	        $char_width = $box[2]-$box[0];
    	    $char_height = $box[5]-$box[3];
			$y_rand = $text_y + rand(-2,2);		
			$text_color = imagecolorallocate ($im_text, 0, 51, 153);
			$img = imagettftext($im_text, $text_size, $text_angle, $x_rand, $text_y + $y_rand, $text_color, $text_font, $this->word[$i]);
			$x_rand += $char_width;
		}
        imagecolortransparent($im_text, $bg_color);
        return $im_text;
        imagedestroy($im_text);
    }

    function draw_image()
	{
        $img_file = $this->dir_background."background".rand(1,4).".jpg";
        $bg_img = @imagecreatefromjpeg ($img_file);
        $bg_width = imagesx($bg_img);
        $bg_height = imagesy($bg_img);
        $this->im = imagecreatetruecolor($this->im_width,$this->im_height);
        imagecopyresampled ($this->im, $bg_img, 0, 0, 0, 0, $this->im_width, $this->im_height, $bg_width, $bg_height);
        imagecopymerge($this->im, $this->draw_text(), 0, 0, 0, 0, $this->im_width, $this->im_height, 70);
        return $this->im;
    }

    function destroy_image()
	{
        imagedestroy($this->im);
    }
}
?>